import { Ivysaur, h, Fragment, state } from "./mod.js"

export class TestRoot extends Ivysaur {
  @state() accessor count = 0;
  render() {
    return (
      <host foo="bar" onclick={() => this.count++}>
        <div>
          <h1>Test</h1>
        </div>
        <button>Click me</button>
        {Array.from({length: this.count}).map((_, i) => (
          <div>Count: {i}</div>
        ))}
      </host>
    )
  }
}

TestRoot.define_self("test-root")
