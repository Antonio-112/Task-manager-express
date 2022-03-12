/* eslint-disable max-len */
const Task = require('../../infra/repositories/task/schemas/task');
const Collection = require('../../infra/repositories/collection/schemas/collection');
const slugify = require('slugify');

exports.create = async (req, res) => {
  try {
    const collection = await Collection.findOne({name: req.body.collection})
        .exec().
        catch((err) => {
          console.error({error: err, code: 404, message: 'Collection not found'});
          return undefined;
        });
    console.log(collection);
    const slug = slugify(req.body.name);
    const newTask = await new Task({
      name: req.body.name,
      description: req.body.description,
      slug: slug,
      collectionId: collection._id,
      status: req.body.status,
      createdBy: req.body.userId,
    }).save();

    collection.tasks.push(newTask._id);
    collection.save();
    return res.json(newTask);
  } catch (e) {
    res.status(400).json({
      err: e.message,
      code: e.code,
    });
  }
};

exports.tasksCount = async (req, res) => {
  console.log('tasksCount');
  const total = await Task.find({status: 'Active'}, {createdBy: req.body.userId}).count()
      .estimatedDocumentCount().exec();
  res.json(total);
};

exports.listAll = async (req, res) => {
  console.log(req.params.count);
  const tasks = await Task.find({createdBy: req.body.userId}).limit(req.params.count).exec();
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
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send('Task deleted failed');
  }
};

exports.read = async (req, res) => {
  const task = await Task.findOne({
    slug: req.params.slug,
    status: 'Active',
    createdBy: req.body.userId,
  }).exec();
  res.json(task);
};

exports.update = async (req, res) => {
  try {
    if (req.body.name) {
      req.body.slug = slugify(req.body.name);
    }

    const updated = await Task.findOneAndUpdate({
      slug: req.param.slug,
      createdBy: req.body.userId,
    },
    req.body,
    {new: true},
    ).exec();

    res.json(updated);
  } catch (err) {
    console.error('Task updated error', err);
    return res.status(400).send('Task update failed');
  }
};
