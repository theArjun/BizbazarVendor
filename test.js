export const createProduct = (product) => {
    const data = new FormData();
    const renderImagePairs = () => {
      const images = [...product.images];
      const params = [];
      const pairs = [];
      const variables = {};
      if (!images.length) {
        return '';
      }
      images.forEach((image, index) => {
        if (index === 1) {
          variables[index] = ['variables.main'];
          return params.push(
            `
              main_pair: {
                detailed: {
                  upload: $main
                }
              }
            `,
          );
        }
        variables[index] = [`variables.image_${index}`];
        return pairs.push(`
          {
            detailed: {
              upload: $image_${index}
            }
          }
        `);
      });
      if (pairs.length) {
        params.push(`
          image_pairs: [${pairs.join(', ')}]
        `);
      }
      data.append('map', JSON.stringify(variables));
      return params.join(', ');
    };
    const renderParams = () => {
      const images = [...product.images];
      const params = [];
      if (!images.length) {
        return '';
      }
      images.forEach((image, index) => {
        if (index === 1) {
          return params.push('$main: FileUpload');
        }
        return params.push(`$image_${index}: FileUpload`);
      });
      return params.join(', ');
    };
    const QUERY = `
      mutation createProduct(
        $product: String!,
        $category_ids: [Int]!,
        $price: Float!,
        $list_price: Float!,
        $full_description: String,
        $amount: Int
        ${renderParams()}
      ) {
        create_product(product: {
          product: $product
          category_ids: $category_ids
          price: $price
          list_price: $list_price
          full_description: $full_description
          amount: $amount
          ${renderImagePairs()}
        })
      }
    `;
    const serializedData = JSON.stringify({
      query: QUERY,
      variables: {
        ...omit(product, ['images']),
        main: null,
        image_0: null,
      },
    });
    data.append('operations', serializedData);
    product.images.forEach((image, index) => {
      const photo = {
        uri: image,
        type: 'image/jpeg',
        name: `${index}.jpg`,
      };
      data.append(index, photo);
    });
    return AxiosInstance.post('', data).then((result) => result.data);
  };