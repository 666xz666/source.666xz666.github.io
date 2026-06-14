---
categories:
- 寒假练题计划
- 提高算法
- 搜索
cover: /images/posts/bfs-multi-source-cover.svg
date: 2025-03-22 14:00:07
index_img: /images/posts/bfs-multi-source-cover.svg
tags:
- cpp
- algorithm
- ACwing
- BFS
- Flood-Fill
- Shortest-Path
- double-ended queue
title: 2025-03-22[BFS]多源BFS_最小步_双端队列
---

# [BFS]多源BFS&最小步&双端队列

## 多源BFS

- **定义**：从多个起点同时开始的BFS。
- **实现方法**：
  - 将`所有起点`同时加入队列。
  - 从这些起点开始，按照BFS的规则进行遍历。

## 最小步模型

- **定义**：求解从起点到终点的最小操作步数。
- **实现方法**：
  - 使用BFS，将每次操作视为一步。
  - 每次从队列中取出当前状态，尝试所有可能的操作，生成新的状态并加入队列。
  - 使用`哈希表`记录状态的前驱，以便回溯路径。

## 双端队列广搜

- **定义**：使用双端队列（deque）优化BFS，适用于边权为0或1的最短路径问题。
- **实现方法**：
  - 使用双端队列代替普通队列。
  - 当遇到权值为0的边时，将节点加入队列头部；遇到权值为1的边时，加入队列尾部。
  - 这种情况实际上是`Dijkstra算法`的特殊情况，因为边权`只有0和1`。



## 例题

### 矩阵距离

```cpp
// https://www.acwing.com/problem/content/175/

/**
 * BFS解决多起点的最短路径问题
 * 解决的思路是提前将所有起点加入BFS的队列中，然后正常执行BFS操作
 * 可以这样理解：有一个虚拟起点，它到所有起点的距离都是0，
 * 这样问题就转换成了求以虚拟点为起点的最短路径！
*/

#include<bits/stdc++.h>

#define x first
#define y second

using namespace std;

typedef pair<int, int> PII;

const int N=1010, M=N*N;

int n, m;
bool g[N][N];
bool st[N][N];
PII q[M];
int hh, tt;
PII pre[N][N];

void bfs(){
    int dx[4]={0, 1, 0, -1}, dy[4]={1, 0, -1, 0};

    while(hh<=tt){
        PII t=q[hh++];
        for(int i=0;i<4;i++){
            int x=t.x+dx[i], y=t.y+dy[i];

            if(x<0 || x>=n || y<0 || y>=m) continue;
            if(st[x][y]) continue;

            q[++tt]={x, y};
            st[x][y]=true;

            pre[x][y]=t;
        }
    }
}

void work(){
    scanf("%d%d", &n, &m);

    hh=0, tt=-1;
    memset(pre, -1, sizeof pre);

    for(int i=0;i<n;i++){
        char s[M];
        scanf(" %s", s);
        // printf("s: %s\n", s);
        for(int j=0;j<m;j++){
            g[i][j]=s[j]-'0';

            if(g[i][j]){
                q[++tt]={i, j};
                st[i][j]=true;
            }
        }
    }

    bfs();
    
    for(int i=0;i<n;i++){
        for(int j=0;j<m;j++){
            if(g[i][j]){
                printf("%d ", 0);
                continue;
            }

            PII end={i, j};
            int cnt=0;
            while(true){
                cnt++;
                if(g[end.x][end.y]) break;
                end=pre[end.x][end.y];
            }
            printf("%d ", cnt-1);
        }
        printf("\n");
    }
}

int main(){
    work();
    return 0;
}
```



### 魔板

```cpp
// http://ybt.ssoier.cn:8088/problem_show.php?pid=1449

/**
 * 最小步模型，实际上是用BFS解决单起点最短路径问题
 * 关键在于如何存储状态
*/

#include<bits/stdc++.h>
using namespace std;

string sta="12345678", ed;
unordered_map<string, pair<string, char>> pre;
queue<string> qu;
int g[2][4];

string getG(){
    string res;
    for(int i=0;i<4;i++) res+=g[0][i]+'0';
    for(int i=3;i>=0;i--) res+=g[1][i]+'0';
    return res; 
}

void setG(string s){
    // cout<<"setG"<<endl;
    // cout<<"s: "<<s<<endl;
    int idx=0;
    for(int i=0;i<4;i++) g[0][i]=s[idx++]-'0';
    for(int i=3;i>=0;i--) g[1][i]=s[idx++]-'0';
    // for(int i=0;i<2;i++){
    //     for(int j=0;j<4;j++) 
    //         cout<<g[i][j]<<" ";
    //     cout<<endl;
    // }
    // while(true){}
}

string moveA(string s){
    setG(s);
    for(int i=0;i<4;i++) swap(g[0][i], g[1][i]);
    return getG();
}

string moveB(string s){
    setG(s);
    int x03=g[0][3], x13=g[1][3];
    for(int i=3;i>=1;i--) g[0][i]=g[0][i-1], g[1][i]=g[1][i-1];
    g[0][0]=x03, g[1][0]=x13;
    return getG();
}

string moveC(string s){
    setG(s);
    int tmp=g[0][1];
    g[0][1]=g[1][1];
    g[1][1]=g[1][2];
    g[1][2]=g[0][2];
    g[0][2]=tmp;
    return getG();
}

void bfs(){
    qu.push(sta);
    pre[sta]={"null", 'X'};

    while(qu.size()){
        string state=qu.front();
        qu.pop();

        // 按照字典序尝试操作，可以保证最后的结果符合最小字典序
        string stateA=moveA(state);
        if(pre.count(stateA)==0){
            qu.push(stateA);
            pre[stateA]={state, 'A'};
            if(stateA==ed) break;
        } 

        string stateB=moveB(state);
        if(pre.count(stateB)==0){
            qu.push(stateB);
            pre[stateB]={state, 'B'};
            if(stateB==ed) break;
        }

        string stateC=moveC(state);
        if(pre.count(stateC)==0){
            qu.push(stateC);
            pre[stateC]={state, 'C'};
            if(stateC==ed) break;
        } 

        // cout<<state<<" "<<stateA<<" "<<stateB<<" "<<stateC<<endl;
        // while(true){}
    }
}

void work(){
    for(int i=0;i<8;i++){
        int x;
        cin>>x;
        ed+=x+'0';
    }
    // cout<<ed;

    bfs();

    int cnt=0;
    stack<char> Stack;
    while(true){
        cnt++;

        if(ed==sta) break;

        auto [state, op]=pre[ed];
        Stack.push(op);
        ed=state;
    }

    cout<<cnt-1<<" ";
    while(Stack.size()) cout<<Stack.top(), Stack.pop();
    
}

int main(){
    work();
    return 0;
}
```





### 电路维修

```cpp
// https://www.acwing.com/problem/content/177/

/**
 * 首先要发现一个很重要的性质，同一条路径中不可能同时包含一个元件的四个点
 * 
 * 可到达的点横、纵坐标和必须为偶数
 * 
 * 所以对于一个元件的两条对角线，本来已连接的，权重视为0，未连接的视为1（要旋转一次）
 * 这样就变成了边权只有0和1的最短路径问题
 * 对于此我们可以使用双端队列模拟优先队列，用BFS解决
 * 
 * 其实是dijstra的特殊情况
*/

#include<bits/stdc++.h>

#define x first
#define y second

using namespace std;

typedef pair<int, int> PII;

const int N=510;

int n, m;
// 边0~n-1,0~m-1
char g[N][N];
int st[N][N];// 已经用作更新的边不能再用

// 点0~n,0~m
deque<PII> q;
int dist[N][N];

int bfs(int sx, int sy){
    q.clear();
    q.push_back({sx, sy});

    memset(dist, 0x3f, sizeof dist);
    dist[sx][sy]=0;

    int dx[4]={-1, -1, 1, 1};
    int dy[4]={-1, 1, -1, 1};
    char cs[4]={'\\', '/', '/', '\\'};

    while(q.size()){
        PII t=q.front();
        q.pop_front();

        for(int i=0;i<4;i++){
            int x=t.x+dx[i], y=t.y+dy[i];
            int u=min(t.x, x), v=min(t.y, y);// 元件的坐标

            if(x<0 || x>n || y<0 || y>m) continue;
            if(u<0 || u>=n || v<0 || v>=m) continue;
            if(st[u][v]) continue;

            int w=g[u][v]!=cs[i];
            if(w) q.push_back({x, y});
            else q.push_front({x, y});

            dist[x][y]=min(dist[x][y], dist[t.x][t.y]+w);

            st[u][v]=true;

            if(x==n && y==m) return dist[x][y];
        }
    }

    return -1;// 不可能到达
}


void work(){
    int T;
    cin>>T;

    while(T--){
        cin>>n>>m;

        for(int i=0;i<n;i++)
            for(int j=0;j<m;j++)
                cin>>g[i][j];

        if(n+m & 1) {
            puts("NO SOLUTION");
            continue;
        }
            
        memset(st, 0, sizeof st);
        cout<<bfs(0, 0)<<endl;
    }
}

int main(){
    work();

    // char c;
    // cin>>c;
    // cout<<(c=='\\');

    return 0;
}
```


