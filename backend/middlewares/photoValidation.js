const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .exists({ checkFalsy: true })
      .withMessage("Title is required.")
      .bail()
      .isString()
      .withMessage("Title must be a string.")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Image is required.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () =>{
  return [
  body("title")
    .optional()
    .isString()
    .withMessage("Title must be a string")
    .bail()
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long."),
  ]
}

const commentValidation = () =>{
  return [
    body("comment")
      .isString()
      .withMessage("A comment is required")
  ]
}

module.exports = { 
photoInsertValidation,
photoUpdateValidation,
commentValidation,
};