export function run(fn: () => Promise<void>) {
  fn()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
