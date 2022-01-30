const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

// get all categories
router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(categories);
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ msg: "Server error" });
    }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get("/:id", async (req, res) => {
    const reqId = req.params.id;

    try {
        const category = await Category.findOne({
            where: {
                id: reqId,
            },
            include: [{ model: Product }],
        });
        category == ""
            ? res
                  .status(400)
                  .json({ error: `No category with id ${reqId} found` })
            : res.status(200).json(category);
    } catch (err) {
        console.log(err);
    }
});

// create a new category
router.post("/", async (req, res) => {
    const body = {
        id: req.body.id,
        category_name: req.body.category_name,
    };
    if (!req.body.id || !req.body.category_name) {
        res.status(404).json({
            message: "request body needs BOTH id and category_name",
        });
    } else {
        try {
            const newCategory = await Category.create(body);
            res.status(201).json(newCategory);
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
});

// update a category by its `id` value
router.put("/:id", async (req, res) => {
    const categoryId = req.params.id;
    try {
        await Category.update({
            where: {
                id: categoryId,
            },
        });
        const updated = Category.findOne({
            where: {
                id: categoryId,
            },
        });
        res.status(201).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// delete a category by its `id` value
router.delete("/:id", async (req, res) => {
    const categoryId = req.params.id;
    try {
        await Category.destroy({
            where: {
                id: categoryId,
            },
        });
    } catch (err) {
        res.status(500).json({
            message: `Category with ID ${categoryId} deleted`,
        });
    }
});

module.exports = router;
