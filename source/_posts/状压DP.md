---
categories:
- 寒假练题计划
- 提高算法
- 动态规划
cover: /images/posts/image-20250318230415548.png
date: 2025-03-18 23:02:26
index_img: /images/posts/image-20250318230415548.png
tags:
- cpp
- algorithm
- ACwing
- DP
title: 2025-03-18[DP]状压DP
---
# 状压DP

## 状态压缩动态规划概述

- **定义**：状态压缩动态规划是一种将问题的状态用二进制位表示，并通过位运算来高效处理状态转移的动态规划方法。它通常用于处理具有组合性质的优化问题，尤其适用于状态数量有限且可以通过位运算快速操作的场景。
- **适用场景**：
  - 问题的状态可以用二进制位表示，且状态数量相对较少（通常不超过 220）。
  - 状态之间的转移关系可以通过位运算高效实现。
  - 问题具有组合性质，需要考虑多种状态组合的最优解。

## 状态压缩的基本概念

- **状态表示**：
  - 使用二进制位表示状态，每一位对应一个元素或一个位置的状态（如 0 表示未选择，1 表示已选择）。
  - 例如，状态 `1011` 表示第 0、1、3 位被选择，第 2 位未被选择。
- **状态转移**：
  - 通过位运算（如与、或、异或、左移、右移）实现状态之间的转换。
  - 例如，`state & (1 << i)` 可以判断第 i 位是否为 1，`state | (1 << i)` 可以将第 i 位设置为 1。

## 状态压缩动态规划的步骤

1. **定义状态**：
   - 确定问题的状态表示方式，通常用一个整数表示一个状态，整数的每一位对应一个元素的状态。
   - 例如，在棋盘问题中，状态可以表示为每一行的棋子分布情况。
2. **初始化状态**：
   - 确定初始状态的值，通常为 0 或其他特定值。
   - 例如，`f[0][0] = 1` 表示初始状态的合法方案数为 1。
3. **状态转移方程**：
   - 根据问题的性质，设计状态转移方程，通过位运算实现状态之间的转换。
   - 例如，在棋盘问题中，状态转移方程可以表示为 `f[i][j][a] += f[i-1][j-c][b]`，其中 `a` 和 `b` 是状态，`c` 是状态 `a` 中的棋子数量。
4. **边界条件**：
   - 确定状态的边界条件，避免非法状态的转移。
   - 例如，在棋盘问题中，需要检查状态是否合法（如没有相邻的棋子）。
5. **求解目标状态**：
   - 根据问题的要求，求解目标状态的值。
   - 例如，在棋盘问题中，目标状态是最后一行的合法方案数。

## 状态压缩动态规划的优化技巧

- **滚动数组**：
  - 使用滚动数组减少空间复杂度，只存储当前行和上一行的状态。
  - 例如，在棋盘问题中，可以使用 `f[i&1][j][a]` 来表示当前行的状态，`f[i-1&1][j][a]` 来表示上一行的状态。
- **预处理合法状态**：
  - 提前计算所有合法的状态，并存储在数组中，避免重复计算。
  - 例如，在棋盘问题中，可以预先计算所有不包含相邻 1 的状态。
- **位运算优化**：
  - 利用位运算的高效性，快速实现状态的判断和转换。
  - 例如，`state & (1 << i)` 可以快速判断第 i 位的状态，`state | (1 << i)` 可以快速设置第 i 位的状态。

## 状态压缩动态规划的常见问题类型

- **棋盘问题**：
  - 在棋盘上放置棋子，要求满足某些条件（如没有相邻的棋子）。
  - 例如，“小国王”问题和“炮兵阵地”问题。
- **组合优化问题**：
  - 从一组元素中选择若干个元素，要求满足某些条件，并求最优解。
  - 例如，“愤怒的小鸟”问题。
- **路径规划问题**：
  - 在图中找到满足某些条件的路径。
  - 例如，“玉米田”问题。

## 状态压缩动态规划的复杂度分析

- **时间复杂度**：
  - 通常为 *O*(*n*×*m*×2*k*)，其中 *n* 和 *m* 是问题的规模，*k* 是状态的位数。
  - 例如，在棋盘问题中，时间复杂度为 *O*(*n*×*m*×2*n*)。
- **空间复杂度**：
  - 通常为 *O*(*m*×2*k*)，其中 *m* 是问题的规模，*k* 是状态的位数。
  - 例如，在棋盘问题中，空间复杂度为 *O*(*m*×2*n*)。
  - 通过滚动数组优化，可以将空间复杂度降低到 *O*(2*k*)。

## 状态压缩动态规划的注意事项

- **状态合法性检查**：
  - 在状态转移过程中，需要确保所有参与转移的状态都是合法的。
  - 例如，在棋盘问题中，需要检查状态是否包含相邻的 1。
- **状态转移顺序**：
  - 确保状态转移的顺序正确，避免重复计算或遗漏某些状态。
  - 例如，在棋盘问题中，需要按照从上到下的顺序逐行转移状态。
- **边界条件处理**：
  - 注意处理边界条件，避免非法状态的转移。
  - 例如，在棋盘问题中，需要处理最后一行的状态转移。



## 例题

### 小国王

```cpp
// https://www.cnblogs.com/littlehb/p/15752053.html

/**
 * 基于连通性的状态压缩DP
*/

#include<bits/stdc++.h>
using namespace std;

typedef long long LL;
const int N=15, M=N*N, K=(1<<10)+10;

int n, m;
vector<int> state;// 记录一行有多少种合法状态
int cnt[K];
vector<int> head[K];// 记录一种状态能转移到哪些状态
LL f[N][M][K];// 只在前i行放棋子，放了j个棋子，第i行状态为s情况下的合法状态数

bool check(int state){
    // 判断当前的状态是否不含相邻的1
    for(int i=0;i<n;i++)
        if((state>>i&1)&&(state>>i+1&1))// 错位相与
            return false;

    return true;        
}

int count(int state){
    // 状态中有几个1
    int res=0;
    for(int i=0;i<n;i++) res+=state>>i&1;
    return res;
}

void work(){
    cin>>n>>m;

    for(int i=0;i<1<<n;i++)
        if(check(i)){
            state.push_back(i);
            cnt[i]=count(i);
        }

    for(int i=0;i<state.size();i++)
        for(int j=0;j<state.size();j++){
            int a=state[i], b=state[j];
            if((a&b)==0&&check(a|b)){
                head[i].push_back(j);
            }
        }

    f[0][0][0]=1;
    for(int i=1;i<=n+1;i++)// 多一行，"n+1行"用于统计结果
        for(int j=0;j<=m;j++)
            for(int a=0;a<state.size();a++)
                for(int b:head[a]){
                    int c=cnt[state[a]];
                    if(j>=c){
                        f[i][j][a]+=f[i-1][j-c][b];
                    }
                }

    cout<<f[n+1][m][0]<<endl;
}

int main(){
    work();
    return 0;
}
```



### 玉米田

```cpp
// https://www.acwing.com/problem/content/329/

#include<bits/stdc++.h>
using namespace std;

const int MOD=1e8, N=15, M=15, K=(1<<12)+10;

int n, m;// n行m列
int t[N];
vector<int> state;
vector<int> head[K];
int f[N][K];


bool check(int state){
    for(int i=0;i<m;i++)
        if((state>>i&1)&&(state>>i+1&1))
            return false;

    return true;       
}

void work(){
    cin>>n>>m;

    for(int i=1;i<=n;i++){
        for(int j=0;j<m;j++){
            int x;
            cin>>x;
            t[i]=t[i]<<1|x;
        }
    }

    for(int i=0;i<1<<m;i++){
        if(check(i)){
            state.push_back(i);
        }
    }

    for(int i=0;i<state.size();i++)
        for(int j=0;j<state.size();j++){
            int a=state[i], b=state[j];
            if((a&b)==0)
                head[i].push_back(j);
        }
            

    f[0][0]=1;
    for(int i=1;i<=n+1;i++)
        for(int a=0;a<state.size();a++)
            if((state[a]&t[i])==state[a])
                for(int b:head[a]){
                    f[i][a]+=f[i-1][b];
                    f[i][a]%=MOD;
                }

    cout<<f[n+1][0]<<endl;
}

int main(){
    work();
    return 0;
}
```



### 炮兵阵地

```cpp
// https://www.acwing.com/problem/content/294/

#include<bits/stdc++.h>
using namespace std;

const int N=110, M=15, K=(1<<10)+10;

int n, m;
vector<int> state;
int cnt[K];
vector<int> head[K];
int g[N];
int f[2][K][K];// 第i-1行状态是j，第i行状态是k, 改滚动数组

bool check(int state){
    for(int i=0;i<m;i++)
        if((state>>i&1) && ((state>>i+1&1) || (state>>i+2&1)))
            return false;

    return true;
}

int count(int state){
    int res=0;
    for(int i=0;i<m;i++) res+=state>>i&1;
    return res;
}

void work(){
    cin>>n>>m;

    for(int i=1;i<=n;i++)
        for(int j=0;j<m;j++){
            char c;
            cin>>c;
            if(c=='H') g[i]+=1<<j;
        }

    for(int i=0;i<1<<m;i++)
        if(check(i)){
            state.push_back(i);
            cnt[i]=count(i);
        }


    for(int i=1;i<=n+2;i++)
        for(int j=0;j<state.size();j++)
            for(int k=0;k<state.size();k++)
                for(int u=0;u<state.size();u++){
                    int a=state[j], b=state[k], c=state[u];
                    if((a&b)|(b&c)|(a&c)) continue;
                    if(g[i-1]&a|g[i]&b) continue;
                    f[i&1][j][k]=max(f[i&1][j][k], f[i-1&1][u][j]+cnt[b]);
                }
                
    cout<<f[n+2&1][0][0]<<endl;
}

int main(){
    work();
    return 0;
}
```





### 愤怒的小鸟

```cpp
// https://www.acwing.com/problem/content/526/

/**
 * 重复覆盖问题
*/

#include<bits/stdc++.h>
using namespace std;

#define x first
#define y second

typedef pair<double, double> PDD;

const int N=18, M=1<<18;
const double eps=1e-6;

int n, m;
PDD q[N];
int path[N][N];
int f[M];

int cmp(double x, double y){
    // 解决浮点数精度问题
    if(fabs(x-y)<eps) return 0;
    if(x<y) return -1;
    return 1;
}

void work(){
    int T;
    cin>>T;

    while(T--){
        cin>>n>>m;
        for(int i=0;i<n;i++) cin>>q[i].x>>q[i].y;

        // 不在同一x坐标两点确定的抛物线上，各个点的情况（在抛物线上，或不在）
        memset(path, 0, sizeof path);
        for(int i=0;i<n;i++){
            path[i][i]=1<<i;// 约定一个点时只包含它自己
            for(int j=0;j<n;j++){
                if(i==j) continue;
                double x1=q[i].x, x2=q[j].x;
                double y1=q[i].y, y2=q[j].y;
                if(!cmp(x1, x2)) continue;
                double a=(y1/x1-y2/x2)/(x1-x2);
                double b=y1/x1-a*x1;
                if(a>=0) continue;
                int state=0;
                for(int k=0;k<n;k++){
                    double x=q[k].x, y=q[k].y;
                    if(!cmp(a*x*x+b*x, y)) state+=1<<k;
                }
                path[i][j]=state;
            }
        }

        memset(f, 0x3f, sizeof f);
        f[0]=0;
        for(int i=0;i<1<<n;i++){
            int x=0;
            for(int j=0;j<n;j++)
                if(!(i>>j&1)){
                    x=j;
                    break;
                }

            for(int j=0;j<n;j++)
                f[i|path[x][j]]=min(f[i|path[x][j]], f[i]+1);
        }

        cout<<f[(1<<n)-1]<<endl;
    }
}

int main(){
    work();
    return 0;
}
```

