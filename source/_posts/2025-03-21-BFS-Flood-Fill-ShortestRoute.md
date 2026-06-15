---
categories:
- 寒假练题计划
- 提高算法
- 搜索
cover: /images/posts/bfs-flood-fill-cover.svg
date: 2025-03-21 02:42:08
index_img: /images/posts/bfs-flood-fill-cover.svg
tags:
- cpp
- algorithm
- ACwing
- BFS
- Flood-Fill
- Shortest-Path
slug: BFS-Flood-Fill-ShortestRoute
permalink: /2025/03/21/BFS-Flood-Fill-ShortestRoute/
title: '[BFS]Flood-Fill&最短路径'
---

# [BFS]Flood-Fill&最短路径

## Flood-Fill的BFS实现

**Flood-Fill（洪水填充算法）** 是一种基于 BFS 的算法，用于填充一个区域，直到遇到边界。它常用于图像处理、迷宫生成和游戏开发等领域。

通过这种算法，我们可以得到一张图中有`多少联通块`，以及各联通块中的一些`性质`。

## BFS的最短路性质

BFS 从起点开始逐层遍历，因此它能够找到从`起点`到`任意点`的`最短路径`（`无权图`）。在每次扩展节点时，BFS 保证了路径的长度是逐步增加的。

针对最短路径问题，我们可以从起点开始BFS，结束后再从终点开始回溯，可以得到最短路径的`逆路径`，顺便获取`路径长度`。

## 例题

### 池塘计数

```cpp
// https://iai.sh.cn/problem/948

/**
 * BFS求联通块数量
*/

#include<bits/stdc++.h>
using namespace std;

#define x first
#define y second

typedef pair<int, int> PII;

const int N=1010, M=N*N;

int n, m;
char g[N][N];
PII q[M];
int hh, tt;
bool st[N][N];

bool check(int i, int j){
    if(i<0 || i>=n || j<0 || j>=m) return false;
    if(g[i][j]=='#' || st[i][j]) return false;

    return true;
}

void push(int i, int j){
    q[++tt]={i, j};
    st[i][j]=true;
}

void bfs(int x0, int y0){
    hh=0, tt=0;
    q[0]={x0, y0};
    st[x0][y0]=true;

    while(hh<=tt){
        auto [x, y]=q[hh++];
        if(check(x-1, y)) push(x-1, y);
        if(check(x+1, y)) push(x+1, y);
        if(check(x, y-1)) push(x, y-1);
        if(check(x, y+1)) push(x, y+1);
    }
}

void work(){
    scanf("%d%d", &n, &m);

    for(int i=0;i<n;i++) scanf("%s", g[i]);

    int cnt=0;
    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++)
            if(g[i][j]=='.' && !st[i][j]){
                bfs(i, j);
                cnt++;
            }
    
    cout<<cnt<<endl;
}

int main(){
    work();
    return 0;
}
```

### 城堡问题

```cpp
// // http://noi.openjudge.cn/ch0205/1817/

/**
 * 同样是BFS求联通块数量，连通性需要翻译；此外还求了联通快的大小
*/

#include<bits/stdc++.h>
using namespace std;

#define x first
#define y second

typedef pair<int, int> PII;

const int N=60, M=N*N;

int n, m;
int g[N][N];
bool st[N][N];
PII q[M];
int hh, tt;

int ans2=0;

bool check(int i, int j){
    if(i<0 || i>=n || j<0 || j>=m) return false;
    if(st[i][j]) return false;

    return true;
}

void push(int i, int j){
    q[++tt]={i, j};
    st[i][j]=true;
}

void bfs(int sx, int sy){
    hh=tt=0;
    q[0]={sx, sy};
    st[sx][sy]=true;

    int sum=0;

    while(hh<=tt){
        auto [x, y]=q[hh++];
        int f=g[x][y];

        sum++;

        if(!(f>>0&1) && check(x, y-1)) push(x, y-1);
        if(!(f>>1&1) && check(x-1, y)) push(x-1, y);
        if(!(f>>2&1) && check(x, y+1)) push(x, y+1);
        if(!(f>>3&1) && check(x+1, y)) push(x+1, y);
    }

    ans2=max(ans2, sum);
}

void work(){
    cin>>n>>m;

    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++)
            cin>>g[i][j];

    int ans1=0;
    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++)
            if(!st[i][j]){
                bfs(i, j);
                ans1++;
            }

    cout<<ans1<<endl;
    cout<<ans2<<endl;
}

int main(){
    work();
    return 0;
}


```

### 山峰和山谷

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1454

/**
 * 判断联通块的性质
*/

#include<bits/stdc++.h>
using namespace std;

#define x first
#define y second

typedef pair<int, int> PII;

const int N=1010, M=N*N;

int n;
int w[N][N];
int st[N][N];
PII q[M];
int hh, tt;
int ans1, ans2;

void bfs(int sx, int sy){
    hh=tt=0;
    q[0]={sx, sy};
    st[sx][sy]=true;

    int height=w[sx][sy];
    bool f1=true, f2=true;

    while(hh<=tt){
        auto [x, y]=q[hh++];

        for(int i=x-1;i<=x+1;i++)
            for(int j=y-1;j<=y+1;j++){
                if(i==x && j==y) continue;
                if(i<0 || i>=n || j<0 || j>=n) continue;

                // 即使之前访问过也要判断周围高度
                if(w[i][j]>height) f1=false;
                else if(w[i][j]<height) f2=false;
                else{
                    if(st[i][j]) continue;// 只有等高，要入队时才考虑有没有访问过
                    q[++tt]={i, j};
                    st[i][j]=true;
                }
            }
    }

    ans1+=f1, ans2+=f2;
}

void work(){
    scanf("%d", &n);

    for(int i=0;i<n;i++)
        for(int j=0;j<n;j++)
            scanf("%d", &w[i][j]);

    for(int i=0;i<n;i++)
        for(int j=0;j<n;j++)
            if(!st[i][j]){
                bfs(i, j);
            }

    printf("%d %d", ans1, ans2);
}

int main(){
    work();
    return 0;
}



```

### 迷宫问题

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1255


/**
 * BFS求最短路径
*/
#include<bits/stdc++.h>

#define x first
#define y second

using namespace std;

typedef pair<int, int> PII;

const int N=1010, M=N*N;

int n;
int g[N][N];
bool st[N][N];
PII q[M];
PII pre[N][N];// 记录最短路径中当前点前一个坐标

void bfs(int sx, int sy){
    int hh=0, tt=0;
    q[0]={sx, sy};
    st[sx][sy]=true;

    memset(pre, -1, sizeof pre);// 等于将每个pair的两个元素都赋值为-1
    
    int dx[4]={0, 1, 0, -1}, dy[4]={1, 0, -1, 0};

    while(hh<=tt){
        PII t=q[hh++];

        for(int i=0;i<4;i++){
            int x=t.x+dx[i], y=t.y+dy[i];

            if(x<0 || x>=n || y<0 || y>=n) continue;
            if(g[x][y]) continue;
            if(st[x][y]) continue;

            q[++tt]={x, y};
            st[x][y]=true;

            pre[x][y]=t;
        }
    }
}

void work(){
    // scanf("%d", &n);
    n=5;

    for(int i=0; i<n; i++)
        for(int j=0; j<n; j++)
            scanf("%d", &g[i][j]);

    bfs(n-1, n-1);

    // 回溯
    PII end(0, 0);
    while(true){
        printf("(%d, %d)\n", end.x, end.y);

        if(end.x==n-1 && end.y==n-1) break;

        end=pre[end.x][end.y];
    }
}

int main(){
    work();
    return 0;
}
```

### 武士风度的牛

```cpp
// https://www.acwing.com/problem/content/190/

#include<bits/stdc++.h>

#define x first
#define y second

using namespace std;

typedef pair<int, int> PII;

const int N=200, M=N*N;

int n, m;
char g[N][N];
bool st[N][N];
PII q[M];
PII pre[N][N];

void bfs(int sx, int sy){
    int hh=0, tt=0;
    q[0]={sx, sy};
    st[sx][sy]=true;

    memset(pre, -1, sizeof pre);

    int dx[8]={1, 1, 2, 2, -1, -1, -2, -2}, dy[8]={2, -2, 1, -1, 2, -2, 1, -1};

    while(hh<=tt){
        PII t=q[hh++];

        for(int i=0;i<8;i++){
            int x=t.x+dx[i], y=t.y+dy[i];

            if(x<0 || x>=n || y<0 || y>=m) continue;
            if(st[x][y]) continue;
            if(g[x][y]=='*') continue;

            q[++tt]={x, y};
            st[x][y]=true;

            pre[x][y]=t; 
        }
    }
}

void work(){
    scanf("%d%d", &m, &n);

    int x0, y0, x1, y1;
    for(int i=0;i<n;i++)
        for(int j=0;j<m;j++){
            scanf(" %c", &g[i][j]);// " %c"：前面加一个空格，自动跳过换行符（空白符）
            if(g[i][j]=='K') x0=i, y0=j;
            if(g[i][j]=='H') x1=i, y1=j;
        }

    bfs(x1, y1);

    int cnt=0;
    PII end(x0, y0);
    while(true){
        cnt++;
        if(end.x==x1 && end.y==y1) break;
        end=pre[end.x][end.y];
    }

    printf("%d", cnt-1);
}

int main(){
    work();
    return 0;
}
```

### 抓住那头牛

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1253

#include<bits/stdc++.h>
using namespace std;

const int N=2e5+10;

int n, k, l, r;
bool st[N];
int q[N];
int pre[N];

int hh=0, tt=0;
void ops(int x, int x0){
    if(x<l || x>r) return;
    if(st[x]) return;

    q[++tt]=x;
    st[x]=true;

    pre[x]=x0;
}

void bfs(int sx){
    q[0]=sx;
    st[sx]=true;

    memset(pre, -1, sizeof pre);

    while(hh<=tt){
        int x0=q[hh++];

        ops(x0+1, x0);
        ops(x0-1, x0);
        ops(2*x0, x0);
    }
}

void work(){
    scanf("%d%d", &n, &k);
    l=0, r=N;

    bfs(n);

    int end=k, cnt=0;
    while(true){
        cnt++;
        if(end==n) break;
        end=pre[end];
    }

    printf("%d", cnt-1);
}

int main(){
    work();
    return 0;
}
```

### 跳房子（30分解答）

```cpp
// https://sim.csp.thusaac.com/contest/36/problem/3

#include<bits/stdc++.h>
using namespace std;

const int N=1e5+10;

int n;
int a[N];
int k[N];

int st[N];
int q[N];
int pre[N];

int skip(int i, int j){
    // 站在第i格向前跳j
    int u=min(i+j, n);
    return u-a[u];
}

void bfs(int sx){
    int hh=0, tt=0;
    q[0]=sx;
    st[sx]=true;

    memset(pre, -1, sizeof pre);

    while(hh<=tt){
        int x0=q[hh++];
        for(int i=1;i<=k[x0];i++){
            int x=skip(x0, i);

            if(x<1 || x>n) continue;
            if(st[x]) continue;

            q[++tt]=x;
            st[x]=true;

            pre[x]=x0;
        }
    }
}

void work(){
    scanf("%d", &n);
    for(int i=1;i<=n;i++) scanf("%d", &a[i]);
    for(int i=1;i<=n;i++) scanf("%d", &k[i]);

    bfs(1);

    // for(int i=1;i<=n;i++) printf("%d ", pre[i]);
    // printf("\n");

    int end=n, cnt=0;
    while(true){
        cnt++;

        if(end==1)break;

        if(pre[end]==-1){
            printf("%d\n", -1);
            return;
        }

        end=pre[end];
    }

    printf("%d\n", cnt-1);
}

int main(){
    work();
    return 0;
}
```




