/**
 * Cartesian product computes a combination of variants.
 *
 * @param data variants data.
 * @returns {*[]} Combined data
 */
function cartesian(data) {
  const inputData = (function (values) {
    const obj = {};
    values.forEach((item) => {
      obj[`${item.type}`] = item.values;
    });
    return obj;
  })(data);

  const requiredFields = {
    inventory: "",
    price: "",
    visible: true,
    checked: false,
    photo: [],
    itemAttributes: {},
  };

  function cartesianProduct(a, currentProducts) {
    const aKey = a[0];
    const aValue = a[1];
    const tempCurrentProducts = currentProducts || [];

    if (Object.keys(tempCurrentProducts).length <= 0) {
      return aValue.map((value) => ({
        [aKey]: value,
        ...requiredFields,
      }));
    }

    const products = [];

    Object.keys(aValue).forEach((key) => {
      tempCurrentProducts.forEach((product) => {
        products.push({
          ...product,
          [aKey]: aValue[key],
          ...requiredFields,
        });
      });
    });

    return products;
  }

  const entries = Object.entries(inputData || {});

  let products = [];
  entries.forEach((entry) => {
    products = cartesianProduct(entry, products);
  });

  return products;
}

/**
 * Compares the differences between two arrays based on their columns. <br/>
 * Returns the intersection of new data with old data.
 *
 * @param oldData Old data
 * @param newData New data
 * @param diffKeys Compare the difference columns data
 * @returns {*[]} The intersection of new data with old data
 */
export function mergesIntersectionOfTwoArrays(
  oldData = [],
  newData = [],
  diffKeys = []
) {
  return newData.map((newItem) => {
    oldData
      .filter((oldItem) =>
        diffKeys.every((key) => newItem[key] === oldItem[key])
      )
      .forEach((equalItem) => {
        Object.keys(equalItem)
          .filter((key) => !diffKeys.includes(key))
          .forEach((k) => {
            newItem[k] = equalItem[k];
          });
      });
    return newItem;
  });
}

export default cartesian;
