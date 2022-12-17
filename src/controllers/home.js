class HomeController {
  getHome(req, res) {
    res.send('Hello world');
  }
}

export default new HomeController();
