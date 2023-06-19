import React,{useState} from "react";
import Modal from "antd/es/modal/Modal";
import { Card, Form, Button, Input, Select, Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import styles from "../Search.module.css";
import './index.css'
import { HiChevronDown,HiChevronRight } from "react-icons/hi";
import { handleAdvanceSearchModal } from "../../../../redux/features/products/productSlice";
const AdvanceSearch = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [byFilter, setByFilter]=useState(false);
  const [byFeature, setByFeature]=useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
    // console.log(getAllOrders())
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <Modal
      title="Advance Search"
      centered
      open={useSelector((state) => state.product.advanceSearch)}
      onOk={() => dispatch(handleAdvanceSearchModal("close"))}
      onCancel={() => dispatch(handleAdvanceSearchModal("close"))}
      width={800}
    >
      <Card bordered={true}>
        <Form
          layout="vertical"
          form={form}
          className={styles.form}
          name="basic"
          // labelCol={{
          //   span: 8,
          // }}
          wrapperCol={{}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className={styles.search_inputs}>
            <Form.Item id="req" label="Find results with" name="search_ref">
              <Input type="text" />
            </Form.Item>
            <div>
              <label>Price (रु)</label>
              <div className={styles.price_container}>
                <Form.Item
                  id="min-price"
                  name="min_price"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>{" "}
                <Form.Item>-</Form.Item>
                <Form.Item
                  id="max-price"
                  name="max_price"
                  style={{ width: "80px" }}
                >
                  <Input type="number" />
                </Form.Item>
              </div>
            </div>
            <Form.Item id="req" label="Search in categories" name="category">
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "computer",
                    label: "Computer",
                  },
                  {
                    value: "electronic",
                    label: "Car electronic",
                  },
                  {
                    value: "internet",
                    label: "Computer and Internet",
                  },
                ]}
              />
            </Form.Item>
          </div>
          <div className="search-in">
          <p>Search in</p>
          <div className={styles.search_inputs}>
            <Form.Item>
            <Checkbox onChange={''}>Product name</Checkbox>
            </Form.Item>
            <Form.Item>
            <Checkbox onChange={''}>Short description</Checkbox>
            </Form.Item>
            <Form.Item>
            <Checkbox onChange={''}>Full description</Checkbox>
            </Form.Item> 
            <Form.Item>
            <Checkbox onChange={''}>Keywords</Checkbox>
            </Form.Item>
            </div>
            </div>
            <div className={styles.search_by_product_filter}>
            <div className={styles.by_filter}>
            {!byFilter?<HiChevronRight/>:<HiChevronDown/>}
            <a href="#" className="" onClick={()=>setByFilter(!byFilter)}>Search by product filters</a>
            </div>
        
            <div className={byFilter?styles.filter_container:styles.filter_container_close} >
                <div className='filter_container_left'>
                <Form.Item id="req" label="Brand" name="category">
                <Select
                  showSearch
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "computer",
                      label: "Computer",
                    },
                    {
                      value: "electronic",
                      label: "Car electronic",
                    },
                    {
                      value: "internet",
                      label: "Computer and Internet",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item id="req" label="Size" name="category">
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "computer",
                    label: "Computer",
                  },
                  {
                    value: "electronic",
                    label: "Car electronic",
                  },
                  {
                    value: "internet",
                    label: "Computer and Internet",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item id="req" label="Display" name="category">
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "computer",
                  label: "Computer",
                },
                {
                  value: "electronic",
                  label: "Car electronic",
                },
                {
                  value: "internet",
                  label: "Computer and Internet",
                },
              ]}
            />
          </Form.Item>
                </div>
                <div className="filter_container_right">
                <Form.Item id="req" label="Color" name="category">
                <Select
                  showSearch
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "computer",
                      label: "Computer",
                    },
                    {
                      value: "electronic",
                      label: "Car electronic",
                    },
                    {
                      value: "internet",
                      label: "Computer and Internet",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item id="req" label="Operating System" name="category">
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "computer",
                    label: "Computer",
                  },
                  {
                    value: "electronic",
                    label: "Car electronic",
                  },
                  {
                    value: "internet",
                    label: "Computer and Internet",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item id="req" label="Storage Capacity" name="category">
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "computer",
                  label: "Computer",
                },
                {
                  value: "electronic",
                  label: "Car electronic",
                },
                {
                  value: "internet",
                  label: "Computer and Internet",
                },
              ]}
            />
          </Form.Item>
                </div>
            </div>
            </div>
            <div className={styles.search_by_product_filter}>
            <div className={styles.by_filter}>
            {!byFeature?<HiChevronRight/>:<HiChevronDown/>}
            <a href="#" className=""  onClick={()=>setByFeature(!byFeature)}>Search by product filters</a>
            </div>
            <div className={byFeature?styles.filter_container:styles.filter_container_close} >
                <div className='filter_container_left'>
                <Form.Item id="req" label="Brand" name="category">
                <Select
                  showSearch
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "computer",
                      label: "Computer",
                    },
                    {
                      value: "electronic",
                      label: "Car electronic",
                    },
                    {
                      value: "internet",
                      label: "Computer and Internet",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item id="req" label="Size" name="category">
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "computer",
                    label: "Computer",
                  },
                  {
                    value: "electronic",
                    label: "Car electronic",
                  },
                  {
                    value: "internet",
                    label: "Computer and Internet",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item id="req" label="Display" name="category">
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "computer",
                  label: "Computer",
                },
                {
                  value: "electronic",
                  label: "Car electronic",
                },
                {
                  value: "internet",
                  label: "Computer and Internet",
                },
              ]}
            />
          </Form.Item>
                </div>
                <div className="filter_container_right">
                <Form.Item id="req" label="Color" name="category">
                <Select
                  showSearch
                  placeholder="Select a category"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: "computer",
                      label: "Computer",
                    },
                    {
                      value: "electronic",
                      label: "Car electronic",
                    },
                    {
                      value: "internet",
                      label: "Computer and Internet",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item id="req" label="Operating System" name="category">
              <Select
                showSearch
                placeholder="Select a category"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "computer",
                    label: "Computer",
                  },
                  {
                    value: "electronic",
                    label: "Car electronic",
                  },
                  {
                    value: "internet",
                    label: "Computer and Internet",
                  },
                ]}
              />
            </Form.Item>
            <Form.Item id="req" label="Storage Capacity" name="category">
            <Select
              showSearch
              placeholder="Select a category"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "computer",
                  label: "Computer",
                },
                {
                  value: "electronic",
                  label: "Car electronic",
                },
                {
                  value: "internet",
                  label: "Computer and Internet",
                },
              ]}
            />
          </Form.Item>
                </div>
            </div>
            </div>
            <div className={styles.remaining_search_fields}>
            <div className="left_field">
            <Form.Item id="req" label="Search by product code" name="search_ref"  style={{ width: "200px" }}>
            <Input type="text" />
          </Form.Item>
            <div>
            <label>Popularity</label>
            <div className={styles.price_container}>
              <Form.Item
                id="min-popularity"
                name="min_popularity"
                style={{ width: "80px" }}
              >
                <Input type="number" />
              </Form.Item>{" "}
              <Form.Item>-</Form.Item>
              <Form.Item
                id="max-popularity"
                name="max_popularity"
                style={{ width: "80px" }}
              >
                <Input type="number" />
              </Form.Item>
            </div>
            <p style={{ width: "250px" }}>Product popularity rating based on how many times the storefront has been viewed, number of additions to cart and number of purchases.</p>
          </div>
          <Form.Item>
          <Checkbox onChange={''}>Subcategories</Checkbox>
          </Form.Item>
          <Form.Item id="req" label="Status" name="category" style={{ width: "200px" }}>
          <Select
            showSearch
            placeholder="Status"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={[
              {
                value: "yes",
                label: "Yes",
              },
              {
                value: "no",
                label: "No",
              },
            ]}
          />
        </Form.Item>
        <Form.Item id="tag" label="Tag" name="search_ref" style={{ width: "200px" }}>
        <Input type="text" />
      </Form.Item>
      <div>
      <label>Sales amount</label>
      <div className={styles.price_container}>
        <Form.Item
          id="min-amt"
          name="min_amt"
          style={{ width: "80px" }}
        >
          <Input type="number" />
        </Form.Item>{" "}
        <Form.Item>-</Form.Item>
        <Form.Item
          id="max-amt"
          name="max_amt"
          style={{ width: "80px" }}
        >
          <Input type="number" />
        </Form.Item>
      </div>
    </div>
            </div>
            <div className="right_field">
            <div>
            <label>Shipping freight (रु)</label>
            <div className={styles.price_container}>
              <Form.Item
                id="min-shipping"
                name="min_shipping"
                style={{ width: "80px" }}
              >
                <Input type="number" />
              </Form.Item>{" "}
              <Form.Item>-</Form.Item>
              <Form.Item
                id="max-shipping"
                name="max_shipping"
                style={{ width: "80px" }}
              >
                <Input type="number" />
              </Form.Item>
            </div>
          </div>
          <div>
          <label>Weight (Kg)</label>
          <div className={styles.price_container}>
            <Form.Item
              id="min-weight"
              name="min_weight"
              style={{ width: "80px" }}
            >
              <Input type="number" />
            </Form.Item>{" "}
            <Form.Item>-</Form.Item>
            <Form.Item
              id="max-weight"
              name="max_weight"
              style={{ width: "80px" }}
            >
              <Input type="number" />
            </Form.Item>
          </div>
        </div>
        <div>
        <label>Quantity</label>
        <div className={styles.price_container}>
          <Form.Item
            id="min-quantity"
            name="min_quantity"
            style={{ width: "80px" }}
          >
            <Input type="number" />
          </Form.Item>{" "}
          <Form.Item>-</Form.Item>
          <Form.Item
            id="max-quantity"
            name="max_quantity"
            style={{ width: "80px" }}
          >
            <Input type="number" />
          </Form.Item>
        </div>
        <Form.Item id="req" label="Search by supplier" name="category">
        <Select
          showSearch
          placeholder="None"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={(input, option) =>
            (option?.label ?? "")
              .toLowerCase()
              .includes(input.toLowerCase())
          }
          options={[
            {
              value: "computer",
              label: "Computer",
            },
            {
              value: "electronic",
              label: "Car electronic",
            },
            {
              value: "internet",
              label: "Computer and Internet",
            },
          ]}
        />
      </Form.Item>
      
        <Form.Item id="req" label="Purchased in orders" name="search_ref">
       <Button>Add orders</Button>
      </Form.Item>
      <div>
      <label>Sort By</label>
      <div className={styles.price_container}>
      <Form.Item id="req" name="category">
      <Select
        showSearch
        placeholder="None"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={[
          {
            value: "list_price",
            label: "List price",
          },
          {
            value: "name",
            label: "Name",
          },
          {
            value: "price",
            label: "Price",
          }, {
            value: "code",
            label: "CODE",
          }, {
            value: "quantity",
            label: "Quantity",
          }, {
            value: "status",
            label: "Status",
          }, {
            value: "bestsellers",
            label: "BestSellers",
          },
        ]}
      />
    </Form.Item>
    
        <Form.Item>-</Form.Item>
        <Form.Item id="req"  name="category">
      <Select
        showSearch
        placeholder="None"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={[
          {
            value: "asc",
            label: "Asc",
          },
          {
            value: "desc",
            label: "Desc",
          },
        ]}
      />
    </Form.Item>
    
      </div>
    </div>
      </div>
            
            </div>
            
            </div>
            <Form.Item id="req" label="Product type" name="category" style={{ width: "200px" }}>
            <Select
              showSearch
              placeholder="None"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                {
                  value: "catalogue_item",
                  label: "Catalogue item",
                },
                {
                  value: "variation",
                  label: "Variation of a catalog item",
                },
              
              ]}
            />
          </Form.Item>
          
        <Form.Item id="req" label="Belongs to catalog" name="search_ref">
        <Button>Add products</Button>
        <Form.Item>
        <span>item:</span> <span>{0} defined items </span>
        </Form.Item>
       </Form.Item>
          <Form.Item className={styles.search_btn}>
            <Button htmlType="submit">Search</Button>
          </Form.Item>
        </Form>
      </Card>
    </Modal>
  );
};

export default AdvanceSearch;
