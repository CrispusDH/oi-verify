### Verify library for Protractor based projects
## The purpose
Ability to check some predicates in case when changes take place with Element(s) that has been already on page and changes depends on some time cost-based oparation (e.g. API call).
### Example:
Let's imagine that we have page with element that contains some User Name. After some changes this text will change, but the element (DOM will be the same) will be the same. So, if we will check immideatly the name the Protractor could return old one. Even after one second it could be still old name. The problem that element has been already on a page.
### What we need:
If we will find Element and then will ping e.g. text of it, so in this case we will always get old name and then we will catch Stateless element exception (that such element is not in the DOM).
So, we need that each time when we will ping predicate it will find again the Element and will not use cached one.

## TBD
