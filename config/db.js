import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    const uri = 'mongodb+srv://daviidciro:Ihaveadream1@cluster0.gyhrb.mongodb.net/Basedatos?retryWrites=true&w=majority';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Conexión a MongoDB exitosa');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); 
  }
};
