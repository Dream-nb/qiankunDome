class Shared {

  get() {
    // 子应用独立运行时
    return "";
  }

  set(params) {
    // 子应用独立运行时
    console.log('params',params);
  }
}

class SharedModule {
  static shared = new Shared();

  /**
   * 重载 shared
   */
  static overloadShared(shared) {
    this.shared = shared;
  }

  /**
   * 获取 shared 实例
   */
  static getShared() {
    return this.shared;
  }
}

export default SharedModule;