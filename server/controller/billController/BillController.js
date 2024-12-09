const Bill = require('../../model/bill/Bill')


const getAllBills = async (req, res) => {
    try {
        const allBills = await Bill.find({})
            .populate({
                path: 'orderId',
                populate: [
                    {
                        path: 'userId'
                    },
                    {
                        path: 'orderItem',
                        populate: {
                            path: 'productId'
                        }
                    }]
            })
            .exec();
        res.status(200).json({
            message: 'Get all bills successfully',
            data: allBills
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}
const addBill = async (req, res) => {
    try {
        const bill = await Bill.create(req.body)
        res.status(200).json({
            message: 'Add bill successfully',
            data: bill
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}



module.exports = {
    getAllBills,
    addBill
}