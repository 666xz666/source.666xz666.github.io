---
categories:
- 寒假练题计划
- 提高算法
- 动态规划
cover: /images/posts/image-20250317011516223.png
date: 2025-03-17 01:12:06
index_img: /images/posts/image-20250317011516223.png
tags:
- cpp
- algorithm
- ACwing
- DP
title: 2025-03-17[DP]树形DP
---
# 树形DP

## 知识点介绍

树形DP是一种基于树结构的动态规划算法。它利用树的递归性质，通过定义状态和状态转移方程来解决问题。树形DP的关键在于：

1. **状态定义**：根据问题的需求，定义每个节点的状态。状态可以是一个值，也可以是一个数组，用于存储与该节点相关的最优解信息。
2. **状态转移**：通过子节点的状态来更新当前节点的状态。状态转移通常基于树的遍历顺序（如深度优先搜索DFS）进行。
3. **边界条件**：明确叶子节点或特殊情况的状态值，作为递归的终止条件。

树形DP适用于以下类型的问题：

- 求树的最长路径（如树的直径）
- 求树的中心
- 求树上满足某些条件的最优解（如最小代价、最大收益等）

## 代码模板

```cpp
#include <bits/stdc++.h>
using namespace std;

const int N = 10010, M = 2 * N;

int n, h[N], e[M], ne[M], idx;
int f[N]; // f[i] 表示以节点 i 为根的子树的最优解

void add(int a, int b) {
    e[idx] = b, ne[idx] = h[a], h[a] = idx++;
}

void dfs(int u, int father) {
    // 初始化当前节点的状态
    f[u] = 0;

    // 遍历当前节点的所有子节点
    for (int i = h[u]; ~i; i = ne[i]) {
        int j = e[i];
        if (j == father) continue; // 跳过父节点

        dfs(j, u); // 递归处理子节点

        // 根据子节点的状态更新当前节点的状态
        f[u] = max(f[u], f[j] + ...); // 根据具体问题修改状态转移方程
    }
}

void work() {
    cin >> n;

    memset(h, -1, sizeof h);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        add(a, b), add(b, a);
    }

    dfs(1, -1); // 从根节点开始DFS

    cout << f[1] << endl; // 输出根节点的最优解
}

int main() {
    work();
    return 0;
}
```



## 例题

### 树的最长路径

```cpp
// https://www.cnblogs.com/littlehb/p/15784687.html


/**
 * 求树的直径
 * 
 * A. 经典方法
 * 1. 任取一点求距离该点最远的点u
 * 2. 再求距离该点最远的点v
 * 
 * B. 树形DP,如下做法
 * 
*/

#include<bits/stdc++.h>
using namespace std;

const int N=10010, M=2*N;

int n;
int h[N], e[M], ne[M], w[M], idx=0;
int ans;

void add(int a, int b, int c){
    e[idx]=b, w[idx]=c, ne[idx]=h[a], h[a]=idx++;
}

int dfs(int u, int father){
    int dist=0; // 表示从当前点向下走的最大长度 
    int d1=0, d2=0; // 最大值和次大值,两者相加可以表示过当前结点的所有路径中最长的长度

    for(int i=h[u];~i;i=ne[i]){
        int j=e[i];
        if(j==father) continue;// 如果遍历到父节点，直接跳过
        int d=dfs(j, u)+w[i];
        dist=max(dist, d);

        if(d>=d1) d2=d1, d1=d;
        else if(d>d2) d2=d;
    }

    ans=max(ans, d1+d2);

    return dist;
}

void work(){
    cin>>n;

    memset(h, -1, sizeof h);
    for(int i=0;i<n-1;i++){
        int a, b, c;
        cin>>a>>b>>c;
        add(a, b, c), add(b, a, c);// 无向边
    }

    dfs(1, -1);// 任选一点开始dfs

    cout<<ans<<endl;
}

int main(){
    work();
    return 0;
}
```



### 树的中心

```cpp
// https://www.cnblogs.com/littlehb/p/15786805.html


/**
 * 求所有点中，到其他点最远距离最小的点
 * 
 * 第一遍dfs，求出每个点向下最大距离和次大距离
 * 第二遍dfs，求
*/

#include<bits/stdc++.h>
using namespace std;

const int N=10010, M=2*N, INF=0x3f3f3f3f;

int n;
int h[N], e[M], ne[M], w[M], idx;
int d1[N], d2[N], p1[N], p2[N], up[N];

void add(int a, int b, int c){
    e[idx]=b, w[idx]=c, ne[idx]=h[a], h[a]=idx++;
}

int dfs_d(int u, int father){
    d1[u]=d2[u]=-INF;
    for(int i=h[u];~i;i=ne[i]){
        int j=e[i];
        if(j==father) continue;
        int d=dfs_d(j, u)+w[i];
        if(d>=d1[u]){
            d2[u]=d1[u], d1[u]=d;
            p2[u]=p1[u], p1[u]=j;
        }
        else if(d>d2[u]) d2[u]=d, p2[u]=j;
    }

    if(d1[u]==-INF) d1[u]=d2[u]=0;

    return d1[u];
}

void dfs_u(int u, int father){
    for(int i=h[u];~i;i=ne[i]){
        int j=e[i];
        if(j==father) continue;

        if(p1[u]==j) up[j]=max(up[u], d2[u])+w[i];
        else up[j]=max(up[u], d1[u])+w[i];

        dfs_u(j, u);
    }
}

void work(){
    cin>>n;
    
    memset(h, -1, sizeof h);
    for(int i=0;i<n-1;i++){
        int a, b, c;
        cin>>a>>b>>c;
        add(a, b, c), add(b, a, c);
    }

    dfs_d(1, -1);
    dfs_u(1, -1);

    int res=INF;
    for(int i=1;i<=n;i++) res=min(res, max(d1[i], up[i]));

    cout<<res<<endl;
}

int main(){
    work();
    return 0;
}
```



### 数字转换

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1577

/**
 * 可以变形成树的最大路径
*/

#include<bits/stdc++.h>
using namespace std;

const int N=50010, M=2*N;

int n;
int sum[N];
int h[N], e[M], ne[M], idx;
bool st[N];
int ans;

void add(int a, int b){
    e[idx]=b, ne[idx]=h[a], h[a]=idx++;
}

int dfs(int u, int father){
    int d1=0, d2=0;
    for(int i=h[u];~i;i=ne[i]){
        int j=e[i];
        if(j==father) continue;

        int d=dfs(j, u)+1;
        if(d>=d1) d2=d1, d1=d;
        else if(d>d2) d2=d;
    }

    ans=max(ans, d1+d2);

    return d1;
}


void work(){
    cin>>n;

    for(int i=1;i<=n;i++)
        for(int j=2;j<=n/i;j++)// j从2开始因为题目中说不包括数本身
            sum[i*j]+=i;// 枚举i是哪些数的约数,sum从下标2开始有赋值

    
    memset(h, -1, sizeof h);
    for(int i=2;i<=n;i++)
        if(i>sum[i]){
            add(sum[i], i);
            st[i]=true;
        }

    // 创建的是一颗森林
    for(int i=1;i<=n;i++)
        if(!st[i]) dfs(i, -1);

    cout<<ans<<endl;
}

int main(){
    work();
    return 0;
}
```



### 二叉苹果树

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1575

/**
 * 有依赖的背包问题的简化版
*/

#include<bits/stdc++.h>
using namespace std;
const int N=110, M=2*N;

int n, m;
int h[N], e[M], ne[M], w[M], idx;
int f[N][N];

void add(int a, int b, int c){
    e[idx]=b, w[idx]=c, ne[idx]=h[a], h[a]=idx++;
}

void dfs(int u, int father){
    for(int i=h[u];~i;i=ne[i]){
        if(e[i]==father) continue;

        dfs(e[i], u);

        for(int j=m;j>=0;j--)
            for(int k=0;k<j;k++)// 要留出1根，u结点和当前结点连接的树枝
                f[u][j]=max(f[u][j], f[u][j-k-1]+f[e[i]][k]+w[i]);
    }
}

void work(){
    cin>>n>>m;

    memset(h, -1, sizeof h);
    for(int i=0;i<n-1;i++){
        int a, b, c;
        cin>>a>>b>>c;
        add(a, b, c), add(b, a, c);
    }

    // 1号是根
    dfs(1, -1);

    cout<<f[1][m]<<endl;
}

int main(){
    work();
    return 0;
}
```



### 战略游戏

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1578

#include<bits/stdc++.h>
using namespace std;

const int N=1510, M=2*N;

int n;
int h[N], e[M], ne[M], idx;
int f[N][2];// 考虑以i为根子树，0表示i号不放士兵，1表示放
bool st[N];

void add(int a, int b){
    e[idx]=b, ne[idx]=h[a], h[a]=idx++;
}

void dfs(int u, int father){
    f[u][0]=0, f[u][1]=1;
    for(int i=h[u];~i;i=ne[i]){
        int j=e[i];
        if(j==father) continue;
        dfs(j, u);
        f[u][0]+=f[j][1];
        f[u][1]+=min(f[j][0], f[j][1]);
    }
}

void work(){
    cin>>n;

    memset(h, -1, sizeof h);
    for(int i=0;i<n;i++){
        int a, k;
        cin>>a>>k;
        while(k--){
            int b;
            cin>>b;
            add(a, b), add(b, a);
            st[b]=true;
        }
    }

    int root;
    for(int i=0;i<n;i++)
        if(!st[i]){
            root=i;
            dfs(root, -1);
            break;
        }

    // cout<<root<<endl;
    cout<<min(f[root][0], f[root][1])<<endl;
}

int main(){
    work();
    return 0;
}
```



### 皇宫看守

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1579

#include<bits/stdc++.h>
using namespace std;

const int N=1510, M=2*N, INF=0x3f3f3f3f;

int n;
int h[N], e[M], ne[M], idx;
int cost[N];
bool st[N];
int f[N][3];// 0表示被没警卫且父节点看到， 1表示没警卫且被子节点看到， 2表示放了警卫

void add(int a, int b){
    e[idx]=b, ne[idx]=h[a], h[a]=idx++;
}

void dfs(int u, int father){
    f[u][0]=0, f[u][1]=0, f[u][2]=cost[u];

    for(int i=h[u]; ~i; i=ne[i]){
        int j=e[i];
        if(j==father) continue;

        dfs(j, u);

        f[u][0]+=min(f[j][1], f[j][2]);
        f[u][2]+=min(f[j][0], min(f[j][1], f[j][2]));
    }

    f[u][1]=INF;
    for(int i=h[u]; ~i; i=ne[i]){
        int j=e[i];
        if(j==father) continue;

        f[u][1]=min(f[u][1], f[j][2]+f[u][0]-min(f[j][1], f[j][2]));
    }
}

void work(){
    cin>>n;

    memset(h, -1, sizeof h);
    for(int i=0; i<n; i++){
        int a, m;
        cin>>a;
        cin>>cost[a]>>m;
        while(m--){
            int b;
            cin>>b;
            add(a, b), add(b, a);
            st[b]=true;
        }
    }

    int root;
    for(int i=1; i<=n; i++)
        if(!st[i]){
            root=i;
            dfs(root, -1);
            break;
        }

    cout<<min(f[root][1], min(f[root][0], f[root][2]))<<endl;
}

int main(){
    work();
    return 0;
}
```











