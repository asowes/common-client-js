import { useEffect } from "react";
import cartesian, {
  mergesIntersectionOfTwoArrays,
} from "../../originLib/arithmetic/cartesian";

function ExCartesian() {
  const data = [
    {
      type: "Color",
      values: ["Red", "Blue"],
      photos: [
        {
          name: "Red",
          photoUrls: [{ key: "xxx", isUploadLoading: false, mediaUrl: "url1" }],
          swatchUrl: "xxx1",
          swatchUrlIsLoading: false,
        },
        {
          name: "Blue",
          photoUrls: [{ key: "xxx", isUploadLoading: false, mediaUrl: "url2" }],
          swatchUrl: "xxx2",
          swatchUrlIsLoading: false,
        },
      ],
    },
    {
      type: "Size",
      values: ["S", "L"],
      photos: [
        {
          name: "S",
          photoUrls: [{ key: "xxx", isUploadLoading: false, mediaUrl: "" }],
        },
        {
          name: "L",
          photoUrls: [{ key: "xxx", isUploadLoading: false, mediaUrl: "" }],
        },
      ],
    },
  ];

  useEffect(() => {
    const result = cartesian(data);
    console.log("cartesian result: ", result);
  }, []);

  useEffect(() => {
    const oldData = [
      {
        Size: "S",
        inventory: "1000",
        price: "666.00",
        visible: true,
        checked: false,
        photo: [],
        itemAttributes: {},
        Model: "G001",
      },
      {
        Size: "L",
        inventory: "1000",
        price: "666.00",
        visible: true,
        checked: false,
        photo: [],
        itemAttributes: {},
        Model: "G001",
      },
      {
        Size: "S",
        inventory: "1000",
        price: "666.00",
        visible: true,
        checked: false,
        photo: [],
        itemAttributes: {},
        Model: "G002",
      },
      {
        Size: "L",
        inventory: "1000",
        price: "666.00",
        visible: true,
        checked: false,
        photo: [],
        itemAttributes: {},
        Model: "G002",
      },
    ];

    const newData = [
      {
        Size: "S",
        inventory: "",
        price: "",
        visible: true,
        checked: false,
        photo: [],
        itemAttributes: {},
        Model: "G001",
      },
      {
        Size: "L",
        inventory: "",
        price: "",
        visible: true,
        checked: false,
        photo: [],
        itemAttributes: {},
        Model: "G001",
      },
    ];

    const result = mergesIntersectionOfTwoArrays(oldData, newData, [
      "Size",
      "Model",
    ]);
    console.log("merge result: ", result);
  });

  return <>看console</>;
}

export default ExCartesian;
