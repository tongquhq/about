/**
 * Created by at15 on 2016/9/7.
 */
'use strict';

class Stack {
    constructor() {
        this.data = [];
        this.len = 0;
    }

    push(ele) {
        this.data[this.len] = ele;
        this.len++;
    }

    pop() {
        this.len--;
        return this.data[this.len];
    }

    top() {
        return this.data[this.len - 1];
    }
}

module.exports = Stack;