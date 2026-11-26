const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const path = require('path');
const { dependencies, peerDependencies } = require("./package.json");
const deps = { ...dependencies, ...peerDependencies };

const setRelativePath = (filePath) => {
  const innerFolders = filePath.split('/').length - 1
  let path = ''
  for (let i = 1; i < innerFolders; i++) {
    path = path + '../'
  }
  return path
}

module.exports = (_, argv) => {
  
  const ecdsPathTemp = argv.mode === 'development'
    ? "http://localhost:1234/"
    : "https://ds.erikacarvalho.dev/"

  return ({
  output: {
    publicPath: ecdsPathTemp,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 1234,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              additionalData: (content, loaderContext) => {
                const { resourcePath, rootContext } = loaderContext;
                const filePath = path.relative(rootContext, resourcePath);

                return filePath.includes('default') 
                  ? content
                  : `@import '${setRelativePath(filePath)}style/default.scss';${content}`;
              },
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "ecds",
      filename: "remoteEntry.js",
      remotes: {},
      exposes: {
        "./NavItem": "./src/atoms/NavItem/index.tsx",
        "./Sidebar": "./src/organisms/Sidebar/index.tsx",
        "./Styles": "./src/atoms/Styles/index.tsx",
        "./Accordion": "./src/atoms/Accordion/index.tsx",
        "./Button": "./src/atoms/Button/index.tsx",
        "./Card": "./src/atoms/Card/index.tsx",
        "./Chart": "./src/atoms/Chart/index.tsx",
        "./Icons": "./src/atoms/Icons/index.tsx",
        "./Img": "./src/atoms/Img/index.tsx",
        "./Input": "./src/atoms/Input/index.tsx",
        "./Link": "./src/atoms/Link/index.tsx",
        "./List": "./src/atoms/List/index.tsx",
        "./MediaControls": "./src/atoms/MediaControls/index.tsx",
        "./Pagination": "./src/atoms/Pagination/index.tsx",
        "./Select": "./src/atoms/Select/index.tsx",
        "./Styles": "./src/atoms/Styles/index.tsx",
        "./Tabs": "./src/atoms/Tabs/index.tsx",
        "./TextArea": "./src/atoms/TextArea/index.tsx",
        "./Tooltip": "./src/atoms/Tooltip/index.tsx",
        "./Audio": "./src/molecules/Audio/index.tsx",
        "./CItem": "./src/molecules/Carousel/index.tsx",
        "./Carousel": "./src/molecules/Carousel/index.tsx",
        "./Dialog": "./src/molecules/Dialog/index.tsx",
        "./Form": "./src/molecules/Form/index.tsx",
        "./Notes": "./src/molecules/Notes/index.tsx",
        "./Table": "./src/molecules/Table/index.tsx",
        "./Video": "./src/molecules/Video/index.tsx",
        "./Header": "./src/organisms/Header/index.tsx",

      },
      
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv()
  ],
})};
