export declare class VNode {
}
export declare type HFunction = (tag: string, props: Record<string, any> | VNode | string | number, ...children: any[]) => VNode;
export declare type TextFunction = (value: string | number) => VNode;
export declare type Fragment = (props: Record<string, any>, ...children: any[]) => VNode;
export declare type RenderFunction = (vnode: VNode, container: Element) => void;
export declare type CSSFunction = (strings: TemplateStringsArray, ...values: string[]) => string;
export declare type StateDecorator = () => <This, T>(value: ClassAccessorDecoratorTarget<This, T>, context: ClassAccessorDecoratorContext<This, T>) => void;
export declare type AttributeDecorator = <T>(name: string, options?: {
    converter?: (val: string | null | undefined) => T;
}) => <This, T>(value: ClassAccessorDecoratorTarget<This, T> | Function, context: ClassAccessorDecoratorContext<This, T> | ClassGetterDecoratorContext<This, T>) => void;
