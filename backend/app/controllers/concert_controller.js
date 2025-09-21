const mongoose = require("mongoose");
const Concert = mongoose.model("Concert");

async function getall_concerts(req, res) {
  try {
    const concerts = await Concert.find();
    res.json(concerts);
  } catch (error) {
    res.status(500).json(FormatError("An error has ocurred", res.statusCode));
  }
}

async function getone_concert(req, res) {
  try {
    const slug = req.params.slug;
    const concert = await Concert.findOne({ slug: slug });
    if (!concert) {
      res.status(404).json(FormatError("Concert not found", res.statusCode));
    } else {
      res.json(concert);
    }
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json(FormatError("Concert not found", res.statusCode));
    } else {
      res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
  }
}

async function create_concert(req, res) {
  try {
    const concert_data = {
      name: req.body.name || null,
      date: req.body.date || null,
      direction: req.body.direction || null,
      protagonist: req.body.protagonist || null,
      description: req.body.description || null,
    };
    const concert = new Concert(concert_data);
    const new_concert = await concert.save();
    res.json(new_concert);
  } catch (error) {
    res.status(500).json(FormatError("An error has ocurred", res.statusCode));
  }
}

async function delete_concert(req, res) {
  try {
    const slug = req.params.slug;
    const concert = await Concert.findOneAndDelete({ slug: slug });
    if (!concert) {
      return res.status(404).json(FormatError("Concert not found", res.statusCode));
    }
    res.json(concert);
  } catch (error) {
    res.status(500).json(FormatError("An error has ocurred", res.statusCode));
  }
}

async function update_concert(req, res) {
  try {
    const slug = req.params.slug;
    const old_concert = await Concert.findOne({ slug: slug });

    if (!old_concert) {
      return res.status(404).json(FormatError("Concert not found", res.statusCode));
    }

    if (old_concert.name !== req.body.name && req.body.name !== undefined) {
      old_concert.slug = null;
    }

    old_concert.name = req.body.name || old_concert.name;
    old_concert.date = req.body.date || old_concert.date;
    old_concert.direction = req.body.direction || old_concert.direction;
    old_concert.protagonist = req.body.protagonist || old_concert.protagonist;
    old_concert.description = req.body.description || old_concert.description;
    const update = await old_concert.save();
    res.json(update);
  } catch (error) {
    if (error.kind === "ObjectId") {
      res.status(404).json(FormatError("Concert not found", res.statusCode));
    } else {
      res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }
  }
}

const concert_controller = {
  getall_concerts: getall_concerts,
  getone_concert: getone_concert,
  create_concert: create_concert,
  delete_concert: delete_concert,
  update_concert: update_concert,
};

module.exports = concert_controller;
