const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require('./config/db/dbConnect');
const userRoutes = require('./routes/user/UserRoutes');
const { errorHandler, notFound } = require('./middlewares/error/errorHandler');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const voucherRoutes = require('./routes/voucher/VoucherRoutes')
const productRouter = require('./routes/product/ProductRouter')
const productCategoryRouter = require('./routes/productCategory/ProductCategoryRouter')
const productTypeRouter = require('./routes/productType/productTypeRouter')
const importProductRouter = require('./routes/importProduct/ImportProductRouter')
const billRouter = require('./routes/bill/BillRouter');
const addressRoutes = require('./routes/address/AddressRoutes');
const authRoutes = require('./routes/auth/AuthRoute');
const orderRoutes = require('./routes/order/OrderRoutes');
const feedbackRoutes = require('./routes/feedback/FeedbackRoutes');
const reviewRoutes = require('./routes/review/ReviewRouters');
// declaire app express
const app = express();

// connect to db mongo 
dbConnect();

// use middlewares
app.use(express.json({
    limit: '500mb'
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// use routes + path 
// User Route
app.use('/api/users', userRoutes);
app.use('/api/vouchers', voucherRoutes);
app.use('/api/products',productRouter)
app.use('/api/productCategory',productCategoryRouter)
app.use('/api/productType',productTypeRouter)
app.use('/api/importProduct',importProductRouter)
app.use('/api/addresses', addressRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/bill', billRouter);
// Error handler
app.use(notFound);
app.use(errorHandler);
// Server run here
const port = process.env.PORT;
app.listen(port, console.log("Server is running at port: " + port));