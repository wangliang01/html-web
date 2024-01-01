/**
 * 两数相加
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

    请你将两个数相加，并以相同形式返回一个表示和的链表。

    你可以假设除了数字 0 之外，这两个数都不会以 0 开头。
 */

function ListNode(val, next) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
}

function addTwoNumbers(l1, l2) {
    let dummpyHead = new ListNode(-1);
    let currentNode = dummpyHead;
    let curry = 0 
    while(l1 || l2) {
        let x = l1 ? l1.val : 0
        let y = l2 ? l2.val : 0
        let sum  = curry + x + y
        curry = Math.floor(sum / 10)
        currentNode.next = new ListNode(sum % 10)

        l1 = l1 ? l1.next : null
        l2 = l2 ? l2.next : null
    }

    if (curry > 0) {
        currentNode.next = new ListNode(curry)
    }

    return dummpyHead.next
}