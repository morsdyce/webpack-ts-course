import webpack from 'webpack';

interface Options {
  filename: string,
  version: string
}

const pluginName:string = 'AppVersionPlugin';

class AppVersionPlugin {
  compiler: webpack.Compiler;

  constructor(private options: Options) {
    if (!this.options.version) {
      throw new Error(`${pluginName} Missing required version parameter`);
    }

    if (!this.options.filename) {
      throw new Error(`${pluginName} Missing required filename parameter`);
    }
  }

  apply(compiler: webpack.Compiler) {
    this.compiler = compiler;

    this.compiler.hooks.emit.tap(pluginName, (compiliation: webpack.compilation.Compilation) => {
      compiliation.assets[this.options.filename] = {
        source: () => this.options.version,
        size: () => this.options.version.length
      }
    });
  }
}

export default AppVersionPlugin;
