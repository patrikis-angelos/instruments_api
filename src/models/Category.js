class Category {
  constructor(properties = {}) {
    this.id = properties.id;
    this.name = properties.name;
    this.created_at = properties.created_at;
    this.updatedt_at = properties.updatedt_at;
  }
}

export default Category;
