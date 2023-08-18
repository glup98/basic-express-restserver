import mongoose from "mongoose";

// Conexión a la base de datos
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("DB online");
  } catch (error) {
    console.log(error);
    throw new Error("Error en la base de datos");
  }
};
