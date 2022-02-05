const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
    // find all tags
    try {
        const tags = await Tag.findAll({
            include: [{ model: Product }],
        });
        res.status(200).json(tags);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
    // be sure to include its associated Product data
});

router.get("/:id", async (req, res) => {
    // find a single tag by its `id`
    const reqId = req.params.id;
    try {
        const tag = await Tag.findOne({
            where: {
                id: reqId,
            },
            include: [{ model: Product }],
        });
        tag == null
            ? res.status(400).json({ error: `No tag with id ${reqId} found` })
            : res.status(200).json(tag);
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: "Server error" });
    }
    // be sure to include its associated Product data
});

router.post("/", (req, res) => {
    // create a new tag
});

router.put("/:id", (req, res) => {
    // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
    // delete on tag by its `id` value
});

module.exports = router;
