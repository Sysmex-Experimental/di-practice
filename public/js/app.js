class AppViewModel {
  constructor() { }

  async submitForm(formData) {
    const data = {};
    formData.forEach((item, i) => {
      const key = item[0];
      const value = item[1];
      data[key] = value;
    });


    axios.post('/api/submit/', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
const loadApp = async () => {
  const form = document.getElementById('form');
  const app = new AppViewModel();

  form.addEventListener('submit', async (evt) => {
    evt.stopPropagation();
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const data = [...formData.entries()];
    await app.submitForm(data);
    alert("ありがとうございました");
  });
};
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadApp, {
    once: true,
  });
} else {
  loadApp();
}
