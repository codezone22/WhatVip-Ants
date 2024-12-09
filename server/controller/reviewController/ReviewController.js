const Review = require("../../model/review/Review");
const successTemplate = require("../../templates/succesTemplate");
const errorTemplate = require("../../templates/errorTemplate");
const cloudinaryCustom = require("../../utils/cloudinaryCustom");
const User = require("../../model/user/User");
const OrderItem = require("../../model/orderItem/OrderItem");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({})
      .populate([
        {
          path: "user",
          model: "User",
        },
        {
          path: "orderItem",
          model: "OrderItem",
          populate: {
            path: "productId",
            model: "Product",
          },
        },
      ])
      .exec();
    const res2 = reviews.map((item) => {
      return {
        _id: item._id,
        star: item.star,
        content: item.content,
        reviewDate: item.reviewDate,
        imagesRv: item.imagesRv,
        isResponsed: item.isResponsed,
        response: item.response,
        user: {
          fullName: item.user.fullName,
          email: item.user.email,
          profilePhoto: item.user.profilePhoto,
        },
        product: item.orderItem.productId,
        productName: item.orderItem.productName,
        orderItemImage: item.orderItem.image,
        size: item.orderItem.size,
        color: item.orderItem.color,
        price: item.orderItem.price,
      };
    });
    const listProductId = [];
    const listProduct = [];
    res2.forEach((item) => {
      if (!listProductId.includes(item.product._id)) {
        listProductId.push(item.product._id);
        listProduct.push(item.product);
      }
    });
    let listGroupReview = [];
    for (let i = 0; i < listProductId.length; i++) {
      const t = { product: listProduct[i], reviews: [] };
      res2.forEach((item2) => {
        if (item2.product._id === listProductId[i]) {
          t.reviews.push({
            ...item2,
            product: null,
          });
        }
      });
      listGroupReview.push(t);
    }
    listGroupReview = listGroupReview.map((item) => {
      return {
        ...item,
        averageStar: (
          item.reviews.reduce((acc, cur) => {
            return acc + cur.star;
          }, 0) / item.reviews.length
        ).toFixed(1),
        OneStar: CountStar(item.reviews, 1),
        TwoStar: CountStar(item.reviews, 2),
        ThreeStar: CountStar(item.reviews, 3),
        FourStar: CountStar(item.reviews, 4),
        FiveStar: CountStar(item.reviews, 5),
        quantityResponsed: CountResponsed(item.reviews),
      };
    });

    return successTemplate(
      res,
      listGroupReview,
      "Get all reviews successfully!",
      200
    );
  } catch (error) {
    return errorTemplate(res, error.message);
  }
};

const responseReview = async (req, res) => {
  try {
    const imageBuffer = [];
    const listImageBase64 = req.body.response.imagesRsp;
    for (let i = 0; i < listImageBase64.length; i++) {
      const result = await cloudinaryCustom.uploader.upload(
        listImageBase64[i],
        {
          folder: "public/images/reviews",
        }
      );
      imageBuffer.push(result.secure_url);
    }
    const rv = await Review.findByIdAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          response: {
            content: req.body.response.content,
            date: new Date(),
            imagesRsp: imageBuffer,
          },
          isResponsed: true,
        },
      }
    ).exec();

    rv.save();
    return successTemplate(res, rv, "Responsed review successfully!", 200);
  } catch (error) {
    return errorTemplate(res, error.message);
  }
};

const getReviewsByProductId = async (req, res) => {
  try {
    const { id } = req.params;
    const reviews = await Review.find({})
      .populate([
        {
          path: "user",
          model: "User",
        },
        {
          path: "orderItem",
          model: "OrderItem",
          populate: {
            path: "productId",
            // match: {
            //   _id: id
            // },
            model: "Product",
          },
        },
      ])
      .exec();
    const res2 = reviews.filter(
      (item) => item.orderItem.productId._id.toString() === id
    );
    res.status(200).json({
      message: "Get reviews by productId successfullly",
      data: res2,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteReviewById = async (req, res) => {
  try {
    const { id } = req.params;
    const itemReview = await Review.findByIdAndDelete(id);
    if (!itemReview) {
      return res.status(404).json({ message: "Không tìm thấy comment này!" });
    }

    const users = await User.findOne({
      reviews: {
        $in: [id]
      }
    })

    const arr = users.reviews.filter(review => review.toString() !== id)

    await User.findByIdAndUpdate(users._id, {
      reviews: arr
    })
    const orderItem = await OrderItem.findOne({
      review: id
    })

    await OrderItem.findOneAndUpdate(
      { _id: orderItem._id },
      { $unset: { review: 1 } }, // Use $unset to remove the 'review' field
      { new: true } // Return the modified document
    );

    return res.status(200).json({
      message: "Xóa thành công",
      data: "Thành công"
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

const CountStar = (arr, star) => {
  let temp = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].star === star) {
      temp = temp + 1;
    }
  }

  let res = (temp / arr.length) * 100;
  return res.toFixed(1);
};

const CountResponsed = (arr) => {
  let temp = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isResponsed === true) {
      temp = temp + 1;
    }
  }
  return temp;
};

module.exports = {
  getAllReviews,
  responseReview,
  getReviewsByProductId,
  deleteReviewById,
};
