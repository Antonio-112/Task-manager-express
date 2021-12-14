const Task = require('./../models/task.js');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    console.log(req);
    req.body.slug = slugify(req.body.title);
    const newTask = new Task(req.body).save();
    res.json(newTask);
  } catch (e) {
    res.status(400).json({
      err: e.message,
      code: e.code,
    });
  }
};

exports.tasksCount = async (req, res) => {
  const total = await Task.find({status: 'Active'})
      .estimateDocumentCount().exec();
  res.json(total);
};

exports.listAll = async (req, res) => {
  const tasks = await Task.find({status: 'Active'})
      .limit(parseInt(req.params.count))
      .exec();
  res.json(tasks);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Task.findOneAndUpdate({
      slug: req.params.slug,
    },
    {
      status: 'Inactive',
    },
    {
      new: true,
    });
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Task deleted failed');
  }
};

exports.remove2 = async (req, res) => {
  try {
    const deleted = await Task.findOneAndRemove({
      slug: req.param.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Task deleted failed');
  }
};

exports.read = async (req, res) => {
  const task = await Task.findOne({
    slug: req.param.slug,
    status: 'Active',
  }).exec();
  res.json(task);
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Task.findOneAndUpdate({
      slug: req.param.slug,
    },
    req.body,
    {new: true},
    ).exec();

    res.json(updated);
  } catch (err) {
    console.log('Task updated error', err);
    return res.status(400).send('Task update failed');
  }
};
