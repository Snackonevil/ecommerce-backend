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

router.post("/", async (req, res) => {
    const body = {
        tag_name: req.body.tag_name,
    };
    if (!req.body.tag_name) {
        res.status(404).json({
            message: "request body needs tag_name",
        });
    } else {
        try {
            const newTag = await Tag.create(body);
            res.status(201).json(newTag);
        } catch (err) {
            res.status(500).json({ message: "Server error" });
        }
    }
});

router.put("/:id", async (req, res) => {
    const tagId = req.params.id;
    try {
        await Tag.update(req.body, {
            where: {
                id: tagId,
            },
        });
        const updated = await Tag.findOne({
            where: {
                id: tagId,
            },
        });
        res.status(201).json(updated);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    const tagId = req.params.id;
    try {
        const category = await Tag.destroy({
            where: {
                id: tagId,
            },
        });
        res.status(200).json({
            message: `Category with ID ${tagId} deleted`,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
