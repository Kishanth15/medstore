import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/pharmacy')
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB Error:', err));
const OrderSchema = new mongoose.Schema({
    customer: {
        name: { 
            type: String,
            required: true 
        },
        phone: { 
            type: String, 
            required: true 
        },
        address: { 
            type: String, 
            required: true 
        }
    },
    items: [
        {
            medicineName: { 
                type: String, 
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true 
            },
            price: { 
                type: Number, 
                required: true 
            }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true 
    },
    
    status: { 
        type: String, 
        enum: ['Paid', 'Pending', 'Confirmed', 'Packing', 'Out for Delivery', 'Delivered', 'Cancelled'],
        default: 'Pending' 
    },
}, { timestamps: true }); 

const PharmacyModel = mongoose.model('Pharmacy',OrderSchema);

const handle = (promise) => {
    return promise
        .then(data =>[null,data])
        .catch(err =>[err, null]);
};
app.post('/pharmacy',async(req,res)=>{
    if(!req.body){
        res.status(400).send("details is missing");
    }
    const data=new PharmacyModel(req.body);
    await data.save();
    res.status(200).send("data added successfully");
});

app.get('/pharmacy',async(req,res)=>{
    const data=await PharmacyModel.find();
    res.status(200).json(data);
});

app.put('/pharmacy/:id',async(req,res)=>{
    const id=req.params.id;
    const data=req.body
    await PharmacyModel.findByIdAndUpdate(id,data);
    res.status(200).send("data updated successfully");
});
app.delete('/pharmacy/:id',async(req,res)=>{
    const id=req.params.id;
    await PharmacyModel.findByIdAndDelete(id);
    res.status(200).send("data deleted successfully");
}); 
app.listen(6615,() => {
    console.log("Server running on port 6615");
});