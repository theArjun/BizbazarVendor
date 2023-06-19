import React from "react";
import styles from "./CategoryNest.module.css";
import NestedObjectData from "../../CategoryData/components/NestedObjectData";
import { useGeneralContext } from "../../../../ContextProvider/ContextProvider";
const CategoryNest = ({ data, panelKey }) => {
  const categoryContext = useGeneralContext();
  return (
    <div className={styles.category_nest}>
      <NestedObjectData
        data={
          categoryContext?.generalState?.nestedCategories?.length
            ? categoryContext?.generalState?.nestedCategories
            : data
        }
        panelKey={panelKey}
      />
    </div>
  );
};

export default CategoryNest;
