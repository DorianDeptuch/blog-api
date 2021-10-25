exports.index_get = (req, res, next) => {
  // res.json({ message: "Blog API" });
  res.render("index");
};

exports.about_get = (req, res, next) => {
  res.render("about");
};
exports.contact_get = (req, res, next) => {
  res.render("contact");
};
