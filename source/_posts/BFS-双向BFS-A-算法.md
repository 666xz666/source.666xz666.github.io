---
title: '2025-03-23[BFS]双向BFS_A*算法'
date: 2025-03-23 21:58:54
tags: [cpp, algorithm, ACwing, BFS, Shortest-Path, A*]
categories: [寒假练题计划, 提高算法, 搜索]
index_img: /images/posts/image-20250323003206318.png
cover: /images/posts/image-20250323003206318.png
---

# [BFS]双向BFS&A*算法



## 双向广搜

#### **核心思想**

- 从起点和终点同时开始搜索，每次扩展一层，直到两个方向的搜索路径相遇。
- 适用于求解最小步数问题，尤其是搜索空间较大时，可以显著优化搜索效率。

#### **关键点**

- **队列和哈希表的使用**：
  - 使用两个队列分别存储从起点和终点出发的待扩展状态。
  - 使用两个哈希表分别记录从起点和终点出发到达每个状态的步数。
- **扩展策略**：
  - 每次从队列中取出一个状态，尝试所有可能的转换。
  - 如果转换后的状态在对方方向的哈希表中出现，则找到了一条路径。
- **终止条件**：
  - 如果两个方向的`队列之一`为空，说明无法找到路径。
  - 如果扩展的`层数`超过某个`阈值`（如10），可以提前终止以避免无限搜索。



## A*算法

#### **核心思想**

- A*算法是一种启发式搜索算法，结合了广度优先搜索（BFS）和启发式函数。
- 通过启发式函数估计从当前状态到达目标状态的代价，从而优化搜索过程。

#### **关键点**

- **启发式函数**：
  - 选择合适的启发式函数是关键，启发式函数需要满足**可接受性**（即估计值不超过真实值）。
  - 在八数码问题中，启发式函数是曼哈顿距离，即每个数字当前位置到目标位置的绝对距离之和。
- **优先队列**：
  - 使用优先队列存储待扩展状态，队列中的状态按照启发式函数值排序。
  - 每次扩展启发式函数值最小的状态。
- **路径记录**：
  - 使用哈希表记录从初始状态到达每个状态的路径，以便在找到目标状态时输出路径。

#### **实现细节**

- 在扩展状态时，需要检查新状态是否已经访问过，并且路径长度是否更短。如果`新路径更长`，则`跳过`该状态。
- A*算法`不能保证`搜索过程中的`每一步`都是`最短路径`，但`最终找到`的路径是最短路径。

## 例题

### 子串变换

```cpp
// https://www.acwing.com/problem/content/192/

/**
 * 双向广搜一般用于最小步数模型
 * 对于搜素空间较大的问题可以优化
 * 
 * 每次可以拓展队列的一层
 * 当拓展层数超过10，可以直接退出了
*/

#include<bits/stdc++.h>
using namespace std;

const int N=6;

string A, B;
int n;
string a[N], b[N];
queue<string> qa, qb;
unordered_map<string, int> da, db;

int extend(
    queue<string> &qa,
    unordered_map<string, int> &da,
    unordered_map<string, int> &db,
    string a[],
    string b[] 
){
    int cnt=qa.size();

    while(cnt--){
        string t=qa.front();
        qa.pop();

        for(int i=0;i<t.size();i++){
            for(int j=0;j<n;j++){
                if(t.substr(i, a[j].size())==a[j]){
                    string state=t.substr(0, i)+b[j]+t.substr(i+a[j].size());

                    // cout<<"state: "<<state<<endl;
                    
                    if(db.count(state)) return da[t]+1+db[state];// 不管有没有遍历过，都要尝试一下两边是否都遍历到
                    
                    if(da.count(state)) continue;

                    qa.push(state);
                    da[state]=da[t]+1;
                }
            }
        }
    }

    return 11;
}

int bfs(string A, string B){
    qa.push(A), qb.push(B);
    da[A]=0, db[B]=0;

    int cnt=0;
    while(qa.size() && qb.size()){// 有一个队列已经空了，还没找到，说明不联通
        int t;
        if(qa.size()<=qb.size()) t=extend(qa, da, db, a, b);
        else t=extend(qb, db, da, b, a);

        if(t<=10) return t;
        if(++cnt>10) return 11;
    }

    return 11;
}

void work(){
    cin>>A>>B;

    if(A==B){
        cout<<0<<endl;
        return;
    }

    while(cin>>a[n]>>b[n]) n++;

    int step=bfs(A, B);
    if(step>10) puts("NO ANSWER!");
    else cout<<step<<endl;
}

int main(){
    work();
    return 0;
}
```



### 八数码

```cpp
// https://www.acwing.com/problem/content/181/

/**
 * A*算法优化BFS
 * 估价函数定义为当前点离起点的真实距离加上离终点的估计距离（要求估计距离<=真实距离）
 * 
 * A*算法只能保证终点是最短路径
*/

#include<bits/stdc++.h>
using namespace std;

typedef pair<int, string> PIS;

int f(string state, string ed="12345678x"){// 估价函数
    int res=0;
    for(int i=0;i<9;i++)
        if(state[i]!='x'){
            int x=i/3, y=i%3;
            int num=state[i]-'1';
            res+= abs(x-num/3)+abs(y-num%3);
        }
    return res;
}

string bfs(string sta, string ed){
    priority_queue<PIS, vector<PIS>, greater<PIS>> q;
    unordered_map<string, string> d;

    q.push({0+f(sta) ,sta});
    d[sta]="";

    while(q.size()){
        auto[w, t]=q.top();
        q.pop();

        if(t==ed) return d[t];

        int dx[4]={0, 1, 0, -1};
        int dy[4]={-1, 0, 1, 0};
        char op[4]={'l', 'd', 'r', 'u'};

        int u;
        for(u=0;u<9;u++)
            if(t[u]=='x') break;

        int x0=u/3, y0=u%3;

        for(int i=0;i<4;i++){
            int x=x0+dx[i], y=y0+dy[i];
            if(x<0 || x>=3 || y<0 || y>=3) continue;

            string state=t;
            swap(state[x0*3+y0], state[x*3+y]);

            /**
             * 这里注意，A*算法过程中不能保证最短路径，
             * 所以一个节点可能多次入队，标准是是否被更新，
             * 就像dijkstra，
             * 严格来说，dijkstra是特殊的A*算法
            */
            if(d.count(state) && d[state].size()<d[t].size()+1) continue;// 不能更新

            d[state]=d[t]+op[i];
            q.push({d[state].size()+f(state), state});
        }
    }

    return "error";// 不可能到达
}

void work(){
    string sta, ed="12345678x";

    for(int i=0;i<9;i++){
        char c;
        cin>>c;
        sta+=c;
    }

    // 计算逆序对数量
    int cnt=0;
    for(int i=0;i<9;i++)
        for(int j=i+1;j<9;j++)
            if(sta[i]!='x' && sta[j]!='x' && sta[i]>sta[j]) cnt++;

    if(cnt & 1){// 逆序对个数为奇数，无解
        puts("unsolvable");
        return ;
    }

    string res=bfs(sta, ed);

    cout<<res<<endl;
}

int main(){
    work();

    return 0;
}
```



### 第K短路

```cpp
// https://www.acwing.com/problem/content/180/

/**
 * BFS终点第K次出队，得到的距离就是第K小
 * A*算法的估价函数使用反向dijstra获取的距离
*/

#include<bits/stdc++.h>
using namespace std;

#define x first 
#define y second 

const int N=1010, M=20010;// 前向星同时存正反两边

typedef pair<int, int> PII;
typedef pair<int, PII> PIII;

int n, m, S, T, K;
int h[N], rh[N], e[M], w[M], ne[M], idx;
int dist[N];// 估价
bool st[N];

void add(int h[], int a, int b, int c){
    e[idx]=b, w[idx]=c, ne[idx]=h[a], h[a]=idx++;
}

void dijstra(int sta, int ed){
    priority_queue<PII, vector<PII>, greater<PII>> heap;
    heap.push({0, sta});

    memset(dist, 0x3f, sizeof dist);
    dist[sta]=0;
    memset(st, 0, sizeof st);

    while(heap.size()){
        auto[d, t]=heap.top();
        heap.pop();

        if(st[t]) continue;
        st[t]=true;

        for(int i=rh[t];~i;i=ne[i]){
            int j=e[i];
            if(dist[j]>dist[t]+w[i]){
                dist[j]=dist[t]+w[i];
                heap.push({dist[j], j});
            }
        }
    }
}

int astar(int sta, int ed){
    if(dist[sta]==0x3f3f3f3f) return -1;// 不联通

    priority_queue<PIII, vector<PIII>, greater<PIII>> heap;
    heap.push({0+dist[sta], {0, sta}});

    int cnt=0;
    while(heap.size()){
        auto[val, u]=heap.top();
        auto[d, t]=u;
        heap.pop();

        if(t==ed) cnt++;
        if(cnt==K) return d;

        // 数据有自环
        if(d>1e6+10) break;

        for(int i=h[t];~i;i=ne[i]){
            int j=e[i];
            heap.push({d+w[i]+dist[j], {d+w[i], j}});
        }
    }

    return -1;
}

void work(){
    cin>>n>>m;

    memset(h, -1, sizeof h);
    memset(rh, -1, sizeof rh);
    for(int i=0;i<m;i++){
        int a, b, c;
        cin>>a>>b>>c;
        add(h, a, b, c), add(rh, b, a, c);
    }

    cin>>S>>T>>K;

    /**
     * 当起点和终点相同时，K中隐含了一条长度为0的没有边的最短路，
     * 但这条路是不对的，因为起点和终点至少包含一条边，
    */
    if(S==T) K++;//  每条最短路中至少要包含一条边

    dijstra(T, S);

    int res=astar(S, T);

    cout<<res<<endl;
}

int main(){
    work();
    return 0;
}

```

