module.exports = app => {
  const controller = app.controllers.utiGoiania;

  app.route('/api/v1/uti-goiania')
    .get(controller.listUtiGoiania);
}