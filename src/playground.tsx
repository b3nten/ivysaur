import { h, Fragment, ivysaur, css, state, effect } from "./mod.js"

class test_comp extends ivysaur {

  @state() accessor count = 0;

  on_mount(): void {
    effect(() => {
      console.log(this.count)
    })
  }

  render() {
    return (
      <Fragment>
        <h1>hello world</h1>
        <p>hello world</p>
        <button onclick={() => this.count++}>click me</button>
        <p>{this.count}</p>
      </Fragment>
    )
  }
}

test_comp.define_self("test-root")
