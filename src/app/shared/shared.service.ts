export class SharedService {
  private dept_list: Map<string, string>;

  constructor() {
    this.dept_list = new Map<string, string>();
    this.dept_list.set('1234', 'Department of Defence');
  }

  setDeptList(arr: { dept_id: string, dept_name: string }[]) {
    for (const obj of arr) {
      this.dept_list.set(obj.dept_id, obj.dept_name);
    }
  }

  getDeptList() {
    return new Map(this.dept_list);
  }
}
