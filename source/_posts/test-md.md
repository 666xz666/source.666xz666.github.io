---
categories:
  - 博客搭建
cover: /img/loading.gif
index_img: /img/loading.gif
tags:
  - test
  - blog
title: test.md
date: 2025-01-17 10:11:20
---
# This is a post for test

本文是对新博客编辑器功能的测试。

[配置指南](https://hexo.fluid-dev.com/docs/guide/)



> [!SUCCESS]
>
> 

```kanban
use strict
# How to use kanban

## Grammar
* General (H1: Kanban title\nH2: Kanban Board\nList: Kanban Task)
- Style (Supports Markdown inline styles: **bold**, *italic*, `code`, ~~delete~~, [link](https://github.com/obgnail/typora_plugin), ![Image](https://avatars.githubusercontent.com/u/48992887?s=96&v=4))
- Strict Mode (Use `use strict` on the first line to enforce strict mode; syntax errors will not be ignored.)
- Hide desc box when empty

## Settings
- Unlimited Quantity (Kanban boards and tasks are infinitely scalable.)
- Customizable Color Scheme (Customize colors in settings.)
- Long Task Lists (Scroll task lists using the mouse wheel below the Kanban board.)
- Many Kanban Boards (Scroll horizontally using Ctrl+mouse wheel.)

## NOTE
- Non Universal Grammar (Intended for temporary use in daily task management.)
```

## 1. Mermaid

![image-20250117203928093](/images/posts/image-20250117203928093.png)

![image-20250117204058222](/images/posts/image-20250117204058222.png)

```mermaid
graph TD
    A[Alice] --> B[Bob]
    A --> C[Carol]
    B --> D[Dave]
    C --> D
    C --> E[Eve]
    D --> F[Frank]
    E --> F
    E --> G[Gina]
    F --> G
```

```mermaid
classDiagram
  class User {
    -String email
    -String phone
    -String password
    -String nickname
    -String avatar
    -List<DownloadRecord> downloadRecords
    -List<ExerciseRecord> exerciseRecords
    +login()
    +register()
    +uploadFile()
    +downloadFile()
    +viewDownloadRecords()
    +viewExerciseRecords()
    +reviewErrorQuestions()
  }
  class DownloadRecord {
    -String fileId
    -String fileName
    -Date downloadTime
  }
  class ExerciseRecord {
    -String questionId
    -String questionContent
    -String userAnswer
    -Boolean isCorrect
    -Date exerciseTime
  }
  class KnowledgeFile {
    -String fileId
    -String fileName
    -String fileType
    -String fileContent
    -Date uploadTime
    -User uploader
    +parseFile()
  }
  class QuestionBank {
    -String bankId
    -String bankName
    -List<Question> questions
    +addQuestion()
    +removeQuestion()
    +searchQuestion()
  }
  class Question {
    -String questionId
    -String questionContent
    -String answer
    -String questionType
    -Integer difficulty
    +checkAnswer()
  }
  class Admin {
    -String adminId
    -String adminName
    -String password
    +login()
    +uploadQuestionBank()
    +crawlQuestionBank()
    +importQuestionBank()
  }
  class Recommendation {
    -User user
    +recommendResources()
    +generateStudyPlan()
  }
  class Community {
    -List<User> users
    +discussQuestion()
    +shareExperience()
    +sendPrivateMessage()
    +likePost()
    +commentPost()
  }
  class DataAnalysis {
    -User user
    +analyzeExerciseData()
    +generateLearningReport()
    +exportReport()
  }
  User "1" -- "*" DownloadRecord
  User "1" -- "*" ExerciseRecord
  KnowledgeFile "1" -- "1" User
  QuestionBank "1" -- "*" Question
  Recommendation "1" -- "1" User
  Community "1" -- "*" User
  DataAnalysis "1" -- "1" User

```

## 2. 公式

```latex
单行使用一个$符号，换行使用两个$符号
计算公式1：$\int_{a}^{b} x^2 dx$<br>计算公式2：$\int_{a}^{b} x^3 dx$<br>$$\int_{a}^{b} x^2 dx$$
$$
Q = XW^Q, \quad K = XW^K, \quad V = XW^V
$$

```

单行使用一个$符号，换行使用两个$符号
计算公式1：$\int_{a}^{b} x^2 dx$<br>计算公式2：$\int_{a}^{b} x^3 dx$<br>

$$
\int_{a}^{b} x^2 dx
$$

$$
Q = XW^Q, \quad K = XW^K, \quad V = XW^V
$$

## 3. 代码

```c++
#include<bits/stdc++.h>
using namespace std;
int main(){
    cout<<"hello world"<<endl;
    return 0;
}
```

…
