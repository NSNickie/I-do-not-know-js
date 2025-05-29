# Appendix B: Practice

## Practicing Comparisons

scheduleMeeting应该接受一个开始时间（以24小时格式的字符串“hh:mm”）和一个会议持续时间（分钟数）。如果会议完全在工作日内（根据dayStart和dayEnd中指定的时间），则应返回true；如果会议违反了工作日的界限，则返回false。

```javascript
const dayStart = "07:30";
const dayEnd = "17:45";

function scheduleMeeting(startTime,durationMinutes) {
    // ..TODO..
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false
```

### 我的想法

看上去这里涉及一个判别时间是否在正常工作时间内的标准。比较直接的一个想法是开始时间大于等于上班时间 并且 结束时间小于等于下班时间 就返回true，否则返回false。

但是重点在于形如“HH:mm”这样的字符串该怎么比较大小？这里其实有两种思路：

1. 分割字符串，将时间分为HH和mm两个部分，优先比较HH，若相等则比较mm。由此可得出结果
2. 将HH:mm全部转换为分钟，算法为allMiutes=60*HH+mm。将结果与转好后的上下班时间做对比，满足要求的返回true，否则返回false

但是还有一个问题，怎么处理时间上的加法？直观上来讲或许可以用mod处理分钟和小时之间进位的问题，但是显然没有直接在total上加上分钟来得方便。因此采用方案2解决问题。

可能得代码：

```javascript
const dayStart = "07:30";
const dayEnd = "17:45";

function timeTransition(time){
  	const [hours,minutes]=time.split(":")
    return 60*Number(hours)+Number(minutes)
  
}

function scheduleMeeting(startTime,durationMinutes) {
   	if (
  timeTransition(startTime) >= timeTransition(dayStart) &&
  timeTransition(startTime) + durationMinutes <= timeTransition(dayEnd)
) {
      return true
    }else{
      return false
    }
}

scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false
```