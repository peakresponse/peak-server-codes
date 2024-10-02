module.exports = {
  default: class Processor {
    preProcess (name, object) {
      if (object.parentName) {
        object.parent = {
          connect: {
            name: object.parentName
          }
        };
        delete object.parentName;
      }
      return object;
    }
  }
};
