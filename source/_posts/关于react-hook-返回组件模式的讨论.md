---
title: 关于react hook 返回组件模式的讨论
tags: []
date: 2023-10-19 08:50:03
---

## hook return component

首先在react中：
- React Component == UI
- React Hook == behavior/Logic

> hook的设计之初的几个点：
> - 解决“reuse stateful logic between components”的问题
> - 允许按照功能划分复杂逻辑，而不是按照生命周期混在一起
> 
> 在hook出现之前，我们只可以将UI抽离成可以复用的component，但是相似的state和loggic还需要写很多遍。hook之后我们解决了这个问题。

通常在业务中，UI和behavior是耦合的，强相关的，比如isOpen和closeModal通常跟Modal 组件强相关联，总是成对出现。
有时候，父组件需要使用behavior数据

-  那么behavior数据应当被提升到父组件吗？即使behavior数据跟子组件强耦合。
-  例如：父组件创建了一个需要知道何时关闭的Modal组件以便取消请求。那么父组件只能管理isOpen状态吗？
-  behavior和component的绑定代码，还需要一遍遍重复吗？

返回组件的模式可能是一个优雅的解决方案。【1】，在hook中，不仅抽离了state和逻辑，组件以及组件和hook的绑定也都放在hook中，hook 返回{ state, method, component }

就像这样：
```
import useMenu from './useMenu'

export const Demo = () => {
// 这里返回的Menu是一个组件，openMenu， closeMenu 是方法，isOpen是state
const { Menu, openMenu, closeMenu, isOpen } = useMenu()

return (
    <React.Fragment>
      <Button onClick={openMenu} variant="contained">
        Example Menu open ?：{ isOpen ? 'yes' : 'no'}
      </Button>

      <Menu />
    </React.Fragment>
  );
}
```

熟悉hook的一定可以注意到一点，Demo每次执行，useMenu都会执行一遍，返回新的component，这显然是不太完美的。

一个解决方案是：

- 返回Component静态定义而不是Component实例
- Returned Compoent和 hook 之间使用Context来共享数据和组件实例引用
> 【2】Third iteration: Return statically defined component from hooks



## 参考文章
【1】[New React Hooks Pattern? Return a Component](https://dev.to/droopytersen/new-react-hooks-pattern-return-a-component-31bh)

【2】[React Design Patterns: Return Component From Hooks](https://blog.bitsrc.io/new-react-design-pattern-return-component-from-hooks-79215c3eac00)

【3】[React Hooks: Compound Components](https://kentcdodds.com/blog/compound-components-with-react-hooks)





