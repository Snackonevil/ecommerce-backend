const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
    try {
        const categories = await Category.findAll();
        // const categories = JSON.stringify(data);
        res.status(200).json(categories);
    } catch (err) {
        console.log(err.message);
        res.status(404).json({ msg: "Server error" });
    }
});

router.get("/:id", async (req, res) => {
    const reqId = req.params.id;

    try {
        const category = await Category.findOne({
            where: {
                id: reqId,
            },
            instance: Product,
        });
        category == ""
            ? res
                  .status(400)
                  .json({ error: `No category with id ${reqId} found` })
            : res.status(200).json(category);
    } catch (err) {
        console.log(err);
    }

    // find one category by its `id` value
    // be sure to include its associated Products
});

router.post("/", (req, res) => {
    // create a new category
});

router.put("/:id", (req, res) => {
    // update a category by its `id` value
});

router.delete("/:id", (req, res) => {
    // delete a category by its `id` value
});

module.exports = router;
