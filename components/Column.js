export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "productPrice",
    header: "Price",
  },
  {
    accessorKey: "imageName",  // Make sure your product data has this key with the image filename
    header: "Image",
    cell: ({ row }) => {
      const imageName = row.getValue("imageName");
    const imageUrl = imageName
  ? `http://10.13.173.3:4040/api/image/${imageName}`
  : null; // or null

      return (
        <img
          src={imageUrl}
          alt="Product"
          style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
          onError={(e) => (e.currentTarget.src = "/placeholder-image.png")}
        />
      );
    },
  },
];
