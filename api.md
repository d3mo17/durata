## Modules

<dl>
<dt><a href="#module_Durata">Durata</a></dt>
<dd><p>Animating float values.</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#DurataSingleValue">DurataSingleValue</a> ℗</dt>
<dd></dd>
<dt><a href="#DurataMultipleValue">DurataMultipleValue</a> ℗</dt>
<dd></dd>
</dl>

<a name="module_Durata"></a>

## Durata
Animating float values.


* [Durata](#module_Durata)
    * _static_
        * [.create(startFloatValue, targetFloatValue, duration, easing)](#module_Durata.create) ⇒ [<code>DurataSingleValue</code>](#DurataSingleValue) \| [<code>DurataMultipleValue</code>](#DurataMultipleValue)
    * _inner_
        * ["update"](#event_update)
        * ["complete"](#event_complete)
        * ["pause"](#event_pause)
        * ["resume"](#event_resume)


* * *

<a name="module_Durata.create"></a>

### Durata.create(startFloatValue, targetFloatValue, duration, easing) ⇒ [<code>DurataSingleValue</code>](#DurataSingleValue) \| [<code>DurataMultipleValue</code>](#DurataMultipleValue)
Creates an object to run initial float value(s) to target value(s).

**Kind**: static method of [<code>Durata</code>](#module_Durata)  
**Throws**:

- <code>RangeError</code> 


| Param | Type |
| --- | --- |
| startFloatValue | <code>Float</code> \| <code>Array.&lt;Float&gt;</code> | 
| targetFloatValue | <code>Float</code> \| <code>Array.&lt;Float&gt;</code> | 
| duration | <code>Int</code> | 
| easing | <code>function</code> | 


* * *

<a name="event_update"></a>

### "update"
Will be fired on each `requestAnimationFrame` until the animation `isComplete`

**Kind**: event emitted by [<code>Durata</code>](#module_Durata)  

* * *

<a name="event_complete"></a>

### "complete"
Will be fired when the animation `isComplete`

**Kind**: event emitted by [<code>Durata</code>](#module_Durata)  

* * *

<a name="event_pause"></a>

### "pause"
Will be fired when the animation `isPaused`

**Kind**: event emitted by [<code>Durata</code>](#module_Durata)  

* * *

<a name="event_resume"></a>

### "resume"
Will be fired when the animation continues after pause

**Kind**: event emitted by [<code>Durata</code>](#module_Durata)  

* * *

<a name="DurataSingleValue"></a>

## DurataSingleValue ℗
**Kind**: global class  
**Access**: private  

* [DurataSingleValue](#DurataSingleValue) ℗
    * [new DurataSingleValue(startValue, targetValue, duration, easing)](#new_DurataSingleValue_new)
    * [.get()](#DurataSingleValue+get) ⇒ <code>Float</code>
    * [.getProgress()](#DurataSingleValue+getProgress) ⇒ <code>Float</code>
    * [.pause(reason)](#DurataSingleValue+pause) ⇒ <code>this</code>
    * [.resume(reason)](#DurataSingleValue+resume) ⇒ <code>this</code>
    * [.on(type, callback)](#DurataSingleValue+on) ⇒ <code>this</code>
    * [.isPaused()](#DurataSingleValue+isPaused) ⇒ <code>Boolean</code>
    * [.isComplete()](#DurataSingleValue+isComplete) ⇒ <code>Boolean</code>


* * *

<a name="new_DurataSingleValue_new"></a>

### new DurataSingleValue(startValue, targetValue, duration, easing)

| Param | Type |
| --- | --- |
| startValue | <code>Float</code> | 
| targetValue | <code>Float</code> | 
| duration | <code>Int</code> | 
| easing | <code>function</code> | 


* * *

<a name="DurataSingleValue+get"></a>

### durataSingleValue.get() ⇒ <code>Float</code>
Returns the current calculated value

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

* * *

<a name="DurataSingleValue+getProgress"></a>

### durataSingleValue.getProgress() ⇒ <code>Float</code>
Returns the progress quotient between 0.0 and 1.0.

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

* * *

<a name="DurataSingleValue+pause"></a>

### durataSingleValue.pause(reason) ⇒ <code>this</code>
Pauses the progress.

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>\*</code> | Data that should be passed to the pause-listener |


* * *

<a name="DurataSingleValue+resume"></a>

### durataSingleValue.resume(reason) ⇒ <code>this</code>
Resumes the paused progress.

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>\*</code> | Data that should be passed to the resume-listener |


* * *

<a name="DurataSingleValue+on"></a>

### durataSingleValue.on(type, callback) ⇒ <code>this</code>
Registers an event listener of a passed type.
Return true in an update-callback, if you want to interrupt the the update-cycle
for this callback.

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Name of the event to listen to |
| callback | <code>function</code> | Action that should be performed on event |


* * *

<a name="DurataSingleValue+isPaused"></a>

### durataSingleValue.isPaused() ⇒ <code>Boolean</code>
Returns whether the animation is paused.

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

* * *

<a name="DurataSingleValue+isComplete"></a>

### durataSingleValue.isComplete() ⇒ <code>Boolean</code>
Returns whether the animation is complete.

**Kind**: instance method of [<code>DurataSingleValue</code>](#DurataSingleValue)  

* * *

<a name="DurataMultipleValue"></a>

## DurataMultipleValue ℗
**Kind**: global class  
**Access**: private  

* [DurataMultipleValue](#DurataMultipleValue) ℗
    * [new DurataMultipleValue(startValues, targetValues, duration, easing)](#new_DurataMultipleValue_new)
    * [.get()](#DurataMultipleValue+get) ⇒ <code>Array</code>
    * [.getProgress()](#DurataMultipleValue+getProgress) ⇒ <code>Float</code>
    * [.pause(reason)](#DurataMultipleValue+pause) ⇒ <code>this</code>
    * [.resume(reason)](#DurataMultipleValue+resume) ⇒ <code>this</code>
    * [.on(type, callback)](#DurataMultipleValue+on) ⇒ <code>this</code>
    * [.isPaused()](#DurataMultipleValue+isPaused) ⇒ <code>Boolean</code>
    * [.isComplete()](#DurataMultipleValue+isComplete) ⇒ <code>Boolean</code>


* * *

<a name="new_DurataMultipleValue_new"></a>

### new DurataMultipleValue(startValues, targetValues, duration, easing)

| Param | Type |
| --- | --- |
| startValues | <code>Array.&lt;Float&gt;</code> | 
| targetValues | <code>Array.&lt;Float&gt;</code> | 
| duration | <code>Int</code> | 
| easing | <code>function</code> | 


* * *

<a name="DurataMultipleValue+get"></a>

### durataMultipleValue.get() ⇒ <code>Array</code>
Returns the current calculated values

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

* * *

<a name="DurataMultipleValue+getProgress"></a>

### durataMultipleValue.getProgress() ⇒ <code>Float</code>
Returns the progress quotient between 0.0 and 1.0.

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

* * *

<a name="DurataMultipleValue+pause"></a>

### durataMultipleValue.pause(reason) ⇒ <code>this</code>
Pauses the progress.

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>\*</code> | Data that should be passed to the pause-listener |


* * *

<a name="DurataMultipleValue+resume"></a>

### durataMultipleValue.resume(reason) ⇒ <code>this</code>
Resumes the paused progress.

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

| Param | Type | Description |
| --- | --- | --- |
| reason | <code>\*</code> | Data that should be passed to the resume-listener |


* * *

<a name="DurataMultipleValue+on"></a>

### durataMultipleValue.on(type, callback) ⇒ <code>this</code>
Registers an event listener of a passed type.
Return true in an update-callback, if you want to interrupt the the update-cycle
for this callback.

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>String</code> | Name of the event to listen to |
| callback | <code>function</code> | Action that should be performed on event |


* * *

<a name="DurataMultipleValue+isPaused"></a>

### durataMultipleValue.isPaused() ⇒ <code>Boolean</code>
Returns whether the animation is paused.

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

* * *

<a name="DurataMultipleValue+isComplete"></a>

### durataMultipleValue.isComplete() ⇒ <code>Boolean</code>
Returns whether the animation is complete.

**Kind**: instance method of [<code>DurataMultipleValue</code>](#DurataMultipleValue)  

* * *

