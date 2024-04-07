import { successMessages } from "../constants/message.js";
import Cars from "../models/cars.js";
import { carsValidate, updateCarsValidation } from "../validate/car.js";
class CarsController {
  async getAllCars(req, res) {
    try {
      const data = await Cars.find({}).populate("categories");
      if (data) {
        return res.status(200).json({ message: "get done", data });
      }
      return res.status(404).json({ message: successMessages.NOT_FOUND });
    } catch (error) {
      res.status(400).json({ message: "get false" });
    }
  }
  async getDetailCars(req, res) {
    try {
      const data = await Cars.findById(req.params.id).populate("categories");
      if (data) {
        return res.status(200).json({ message: "get done", data });
      }
      return res.status(404).json({ message: successMessages.NOT_FOUND });
    } catch (error) {
      return res.status(400).json({ message: "get detail false" });
    }
  }
  async createCars(req, res) {
    try {
      const { error } = carsValidate.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }

      const data = await Cars.create(req.body);
      if (data) {
        return res.status(200).json({ message: "create done", data });
      }
      return res.status(404).json({ message: successMessages.NOT_FOUND });
    } catch (error) {
      res.status(400).json({ message: "create false" });
    }
  }
  async updateCars(req, res) {
    try {
      const { error } = updateCarsValidation.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((err) => err.message);
        return res.status(400).json({ message: errors });
      }

      const data = await Cars.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (data) {
        return res.status(200).json({ message: "update done", data });
      }
      return res.status(404).json({ message: successMessages.NOT_FOUND });
    } catch (error) {
      res.status(400).json({ message: "update false" });
    }
  }

  async deleteCars(req, res) {
    try {
      const data = await Cars.findByIdAndDelete(req.params.id);
      if (data) {
        return res.status(200).json({ message: "delete done", data });
      }
      return res.status(404).json({ message: successMessages.NOT_FOUND });
    } catch (error) {
      res.status(400).json({ message: successMessages.DELETE_FAIL });
    }
  }
}
export default CarsController;
