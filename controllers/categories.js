import Category from "../models/categories.js";

class CategorieController {
  async getAllCategorie(req, res) {
    try {
      const categories = await Category.find({});
      console.log(categories);
      if (categories) {
        return res
          .status(200)
          .json({ message: "lấy nhiều sản phẩm thành công", categories });
      }
      return res.status(400).json({ message: "lấy nhiều sản phẩm thất bại" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getlCategorieDetail(req, res) {
    try {
      const categorie = await Category.findById(req.params.id);
      console.log(categorie);
      if (categorie) {
        return res
          .status(200)
          .json({ message: "lấy 1 sản phẩm thành công", categorie });
      }
      return res.status(404).json({ message: "lấy 1 sản phẩm thất bại" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async createCategorie(req, res) {
    try {
      const data = await Category.create(req.body);
      console.log(data);
      if (!data) {
        return res.status(400).json({ message: "thêm sản phẩm thất bại" });
      }
      return res.status(200).json({
        message: "thêm sản phẩm thành công",
        data,
      });
    } catch (error) {
      res.status(400).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async updateCategorie(req, res) {
    try {
      const data = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (data) {
        return res
          .status(200)
          .json({ mes: "cập nhật sản phẩm thành công", data });
      }
      return res.status(401).json({ mess: "cập nhật sản phẩm thất bại", data });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteCategorie(req, res) {
    try {
      const data = await Category.findByIdAndDelete(req.params.id);
      if (data) {
        return res.status(200).json({
          mes: "Xóa sản phẩm thành công !!!",
        });
      }
      return res
        .status(404)
        .json({ message: "không tim thấy sản phẩm cần xóa" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}
export default CategorieController;
