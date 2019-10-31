const Yup = require('yup');
const Todo = require('./../models/Todo');

const schema = Yup.object().shape({
  value: Yup.string().required()
});

class TodoController {
  async store(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação do conteúdo do body' });
    }

    const { value } = req.body;

    const todo = await Todo.create({ value, user: req.userId });
    return res.json(todo);
  }
  
  async index(req, res) {
    const todo = await Todo.find({ user: req.params.user });
    return res.json(todo);
  }

  async delete(req, res) {
    const todo = await Todo.findByIdAndDelete(req.params.todo);
    return res.json(todo);
  }

  async update(req, res) {
    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Erro na validação do conteúdo do body' });
    }

    const todo = await Todo.findOne(
      { _id: req.params.todo, user: req.params.user },
      (err, doc) => {
        if (err) {
          return res.status(400).json({ error: 'Erro ao fazer update' });
        }

        doc.value = req.body.value;

        doc.save(function(err) {
          if (err) {
            return res.status(400).json({ error: 'Erro ao fazer update' });
          }
          return res.json(doc);
        });
      }
    );
  }
}

module.exports = new TodoController();