
//الفيل ده معمول عشلت اقدر اغير نوع الدتابيز الى انا شغال بيها





export const findOne = async ({
  model,        // UserModel
  filter = {},  // { email }
  select = "",  // "-password"
  options = {}
}) => {
  let doc = model.findOne(filter);

  if (select.length) {
    doc = doc.select(select);
  }

  if (options.populate) {
    doc = doc.populate(options.populate);
  }

  return await doc;
};