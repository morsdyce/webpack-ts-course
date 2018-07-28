import webpack from 'webpack';
import path from 'path';
import fs from 'fs';

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

    this.compiler.hooks.done.tap(pluginName, (stats: webpack.Stats) => {
      const fullPath = path.join(stats.compilation.outputOptions.path, this.options.filename);
      fs.writeFileSync(fullPath, this.options.version);
    });
  }
}

export default AppVersionPlugin;
