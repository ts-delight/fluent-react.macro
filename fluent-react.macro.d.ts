import * as React from 'react';

interface HTMLElementsRegistry {
  a: HTMLAnchorElement;
  area: HTMLAreaElement;
  audio: HTMLAudioElement;
  base: HTMLBaseElement;
  body: HTMLBodyElement;
  br: HTMLBRElement;
  button: HTMLButtonElement;
  canvas: HTMLCanvasElement;
  col: HTMLTableColElement;
  colgroup: HTMLTableColElement;
  data: HTMLDataElement;
  datalist: HTMLDataListElement;
  dialog: HTMLDialogElement;
  div: HTMLDivElement;
  dl: HTMLDListElement;
  embed: HTMLEmbedElement;
  fieldset: HTMLFieldSetElement;
  form: HTMLFormElement;
  h1: HTMLHeadingElement;
  h2: HTMLHeadingElement;
  h3: HTMLHeadingElement;
  h4: HTMLHeadingElement;
  h5: HTMLHeadingElement;
  h6: HTMLHeadingElement;
  hr: HTMLHRElement;
  iframe: HTMLIFrameElement;
  img: HTMLImageElement;
  input: HTMLInputElement;
  ins: HTMLModElement;
  label: HTMLLabelElement;
  legend: HTMLLegendElement;
  li: HTMLLIElement;
  link: HTMLLinkElement;
  map: HTMLMapElement;
  meta: HTMLMetaElement;
  object: HTMLObjectElement;
  ol: HTMLOListElement;
  optgroup: HTMLOptGroupElement;
  option: HTMLOptionElement;
  p: HTMLParagraphElement;
  param: HTMLParamElement;
  pre: HTMLPreElement;
  progress: HTMLProgressElement;
  q: HTMLQuoteElement;
  script: HTMLScriptElement;
  select: HTMLSelectElement;
  source: HTMLSourceElement;
  span: HTMLSpanElement;
  style: HTMLStyleElement;
  table: HTMLTableElement;
  template: HTMLTemplateElement;
  tbody: HTMLTableSectionElement;
  td: HTMLTableDataCellElement;
  textarea: HTMLTextAreaElement;
  tfoot: HTMLTableSectionElement;
  th: HTMLTableHeaderCellElement;
  thead: HTMLTableSectionElement;
  title: HTMLTitleElement;
  tr: HTMLTableRowElement;
  track: HTMLTrackElement;
  ul: HTMLUListElement;
  video: HTMLVideoElement;
  webview: HTMLWebViewElement;
}

interface SVGElementsRegistry {
  svg: SVGSVGElement;
  circle: SVGCircleElement;
  clippath: SVGClipPathElement;
  defs: SVGDefsElement;
  desc: SVGDescElement;
  ellipse: SVGEllipseElement;
  feblend: SVGFEBlendElement;
  fecolormatrix: SVGFEColorMatrixElement;
  fecomponenttransfer: SVGFEComponentTransferElement;
  fecomposite: SVGFECompositeElement;
  feconvolvematrix: SVGFEConvolveMatrixElement;
  fediffuselighting: SVGFEDiffuseLightingElement;
  fedisplacementmap: SVGFEDisplacementMapElement;
  fedistantlight: SVGFEDistantLightElement;
  fedropshadow: SVGFEDropShadowElement;
  feflood: SVGFEFloodElement;
  fefunca: SVGFEFuncAElement;
  fefuncb: SVGFEFuncBElement;
  fefuncg: SVGFEFuncGElement;
  fefuncr: SVGFEFuncRElement;
  fegaussianblur: SVGFEGaussianBlurElement;
  feimage: SVGFEImageElement;
  femerge: SVGFEMergeElement;
  femergenode: SVGFEMergeNodeElement;
  femorphology: SVGFEMorphologyElement;
  feoffset: SVGFEOffsetElement;
  fepointlight: SVGFEPointLightElement;
  fespecularlighting: SVGFESpecularLightingElement;
  fespotlight: SVGFESpotLightElement;
  fetile: SVGFETileElement;
  feturbulence: SVGFETurbulenceElement;
  filter: SVGFilterElement;
  foreignobject: SVGForeignObjectElement;
  g: SVGGElement;
  image: SVGImageElement;
  line: SVGLineElement;
  lineargradient: SVGLinearGradientElement;
  marker: SVGMarkerElement;
  mask: SVGMaskElement;
  metadata: SVGMetadataElement;
  path: SVGPathElement;
  pattern: SVGPatternElement;
  polygon: SVGPolygonElement;
  polyline: SVGPolylineElement;
  radialgradient: SVGRadialGradientElement;
  rect: SVGRectElement;
  stop: SVGStopElement;
  switch: SVGSwitchElement;
  symbol: SVGSymbolElement;
  text: SVGTextElement;
  textpath: SVGTextPathElement;
  tspan: SVGTSpanElement;
  use: SVGUseElement;
  view: SVGViewElement;
}

interface HTMLAttributesRegistry {
  a: React.AnchorHTMLAttributes<HTMLAnchorElement>;
  area: React.AreaHTMLAttributes<HTMLAreaElement>;
  audio: React.AudioHTMLAttributes<HTMLAudioElement>;
  base: React.BaseHTMLAttributes<HTMLBaseElement>;
  blockquote: React.BlockquoteHTMLAttributes<HTMLElement>;
  button: React.ButtonHTMLAttributes<HTMLButtonElement>;
  canvas: React.CanvasHTMLAttributes<HTMLCanvasElement>;
  col: React.ColHTMLAttributes<HTMLTableColElement>;
  colgroup: React.ColgroupHTMLAttributes<HTMLTableColElement>;
  data: React.DataHTMLAttributes<HTMLDataElement>;
  del: React.DelHTMLAttributes<HTMLElement>;
  details: React.DetailsHTMLAttributes<HTMLElement>;
  dialog: React.DialogHTMLAttributes<HTMLDialogElement>;
  embed: React.EmbedHTMLAttributes<HTMLEmbedElement>;
  fieldset: React.FieldsetHTMLAttributes<HTMLFieldSetElement>;
  form: React.FormHTMLAttributes<HTMLFormElement>;
  html: React.HtmlHTMLAttributes<HTMLHtmlElement>;
  iframe: React.IframeHTMLAttributes<HTMLIFrameElement>;
  img: React.ImgHTMLAttributes<HTMLImageElement>;
  input: React.InputHTMLAttributes<HTMLInputElement>;
  ins: React.InsHTMLAttributes<HTMLModElement>;
  keygen: React.KeygenHTMLAttributes<HTMLElement>;
  label: React.LabelHTMLAttributes<HTMLLabelElement>;
  li: React.LiHTMLAttributes<HTMLLIElement>;
  link: React.LinkHTMLAttributes<HTMLLinkElement>;
  map: React.MapHTMLAttributes<HTMLMapElement>;
  menu: React.MenuHTMLAttributes<HTMLElement>;
  meta: React.MetaHTMLAttributes<HTMLMetaElement>;
  meter: React.MeterHTMLAttributes<HTMLElement>;
  object: React.ObjectHTMLAttributes<HTMLObjectElement>;
  ol: React.OlHTMLAttributes<HTMLOListElement>;
  optgroup: React.OptgroupHTMLAttributes<HTMLOptGroupElement>;
  option: React.OptionHTMLAttributes<HTMLOptionElement>;
  output: React.OutputHTMLAttributes<HTMLElement>;
  param: React.ParamHTMLAttributes<HTMLParamElement>;
  progress: React.ProgressHTMLAttributes<HTMLProgressElement>;
  q: React.QuoteHTMLAttributes<HTMLQuoteElement>;
  script: React.ScriptHTMLAttributes<HTMLScriptElement>;
  select: React.SelectHTMLAttributes<HTMLSelectElement>;
  source: React.SourceHTMLAttributes<HTMLSourceElement>;
  style: React.StyleHTMLAttributes<HTMLStyleElement>;
  table: React.TableHTMLAttributes<HTMLTableElement>;
  td: React.TdHTMLAttributes<HTMLTableDataCellElement>;
  textarea: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
  th: React.ThHTMLAttributes<HTMLTableHeaderCellElement>;
  time: React.TimeHTMLAttributes<HTMLElement>;
  track: React.TrackHTMLAttributes<HTMLTrackElement>;
  video: React.VideoHTMLAttributes<HTMLVideoElement>;
  webview: React.WebViewHTMLAttributes<HTMLWebViewElement>;
}

export type PropBuilder<TProps extends {}, TRes> = {
  readonly [K in keyof TProps]-?: (<V extends TProps[K]>(
    v: V
  ) => PropBuilder<Omit<TProps, K>, TRes>);
} &
  ({} extends TProps
    ? {
        end: () => TRes;
      }
    : {});

type ElementFor<
  TRegistry extends {},
  TKey extends string,
  TDefault
> = TKey extends keyof TRegistry ? TRegistry[TKey] : HTMLElement;

type HTMLElementFor<TKey extends keyof React.ReactHTML> = ElementFor<
  HTMLElementsRegistry,
  TKey,
  HTMLElement
>;

type SVGElementFor<TKey extends keyof React.ReactSVG> = ElementFor<
  SVGElementsRegistry,
  TKey,
  SVGElement
>;

type AttributesOf<
  TRegistry extends {},
  TKey extends keyof React.ReactHTML,
  TDefault
> = TKey extends keyof TRegistry ? TRegistry[TKey] : TDefault;

type HTMLAttributesOf<TKey extends keyof React.ReactHTML> = AttributesOf<
  HTMLAttributesRegistry,
  TKey,
  React.HTMLAttributes<HTMLElementFor<TKey>>
>;

interface ReactFluentBuilder {
  // DOM Element:

  <P extends HTMLAttributesOf<K>, K extends keyof React.ReactHTML>(
    type: K
  ): PropBuilder<
    React.ClassAttributes<HTMLElementFor<K>> & P,
    React.DetailedReactHTMLElement<P, HTMLElementFor<K>>
  >;
  <
    P extends React.SVGAttributes<SVGElementFor<K>>,
    K extends keyof React.ReactSVG
  >(
    type: K
  ): PropBuilder<
    React.ClassAttributes<SVGElementFor<K>> & P,
    React.ReactSVGElement
  >;
  <P extends React.DOMAttributes<T>, T extends Element>(
    type: string
  ): PropBuilder<React.ClassAttributes<T> & P, React.DOMElement<P, T>>;

  // Custom Components:
  <P extends {}>(type: React.FunctionComponent<P>): PropBuilder<
    React.Attributes & P,
    React.FunctionComponentElement<P>
  >;
  <P extends {}>(
    type: React.ClassType<
      P,
      React.ClassicComponent<P, React.ComponentState>,
      React.ClassicComponentClass<P>
    >
  ): PropBuilder<
    React.ClassAttributes<React.ClassicComponent<P, React.ComponentState>> & P,
    React.CElement<P, React.ClassicComponent<P, React.ComponentState>>
  >;
  <
    P extends {},
    T extends React.Component<P, React.ComponentState>,
    C extends React.ComponentClass<P>
  >(
    type: React.ClassType<P, T, C>
  ): PropBuilder<React.ClassAttributes<T> & P, React.ClassType<P, T, C>>;
  <P extends {}>(
    type: React.FunctionComponent<P> | React.ComponentClass<P> | string
  ): PropBuilder<React.Attributes & P, React.ReactElement<P>>;
}

declare const R: ReactFluentBuilder;

export default R;
