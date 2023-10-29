/*
   NOT sure - Use object destructuring to simplify object property access
   NOT sure - Use querySelector and querySelectorAll for simpler DOM element selection.
   Haved used the spread operator -> Use for...of for iterating over arrays
 */

   // ###### Change to Modular function instead of IIFE
   (function () {
    //Remove 'use' strict as ES6 modules are always in strict mode
    'use strict';
  
    const TITLE_WHEN_CLOSED = 'Expand';
    const TITLE_WHEN_OPEN = 'Collapse';
  
    /* requestAnimationFrame shimming.
      -- used for scheduling animations and other tasks that need
          to be synchronized with the browser's rendering process
    */
    const requestAnimationFrame =
      window.requestAnimationFrame || // standard way to schedule animations
      // browser-specific
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame || 
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      // if none available, self-set frame rate
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  
    // function toggleSummary (evt) {
    const toggleSummary = evt =>{
      // Prevent the text from being selected if rapidly clicked.
      evt.preventDefault();
  
      const summary = evt.target;
      const detail = findDetailFor(summary);
      if (!detail) { return; }
  
      // CSS Transitions don't work as expected on things set to 'display: none'. Make the
      // stretch details visible if needed, then use a timeout for the transition to take
      // effect.
      if (summary.classList.contains('stretchtext-open')) {
        detail.style.display = 'none';
      } else {
        detail.style.display = isBlockLevelDetail(summary) ? 'block' : 'inline';
      }
  
      requestAnimationFrame(function () {
        summary.classList.toggle('stretchtext-open');
        detail.classList.toggle('stretchtext-open');
  
        if (summary.classList.contains('stretchtext-open')) {
          setTitle(summary, TITLE_WHEN_OPEN);
        } else {
          setTitle(summary, TITLE_WHEN_CLOSED);
        }
      });
    }
  
    /* Return boolean: if the strechtext starts from a new paragraph */
    // function isBlockLevelDetail (summary) {
    const isBlockLevelDetail = summary => {
      return summary.nodeName.toLowerCase() === 'a';
    }
  
    /* Set the value of the attribute 'title' on element summary */
    // function setTitle (summary, title) {
    const setTitle = (summary, title) =>{
      // If the user placed a manual title on the summary leave it alone.
  
      // if (summary.hasAttribute('title')) {
      //   return;
      // } else {
      //   summary.setAttribute('title', title);
      // }
  
      if (!summary.hasAttribute('title')) {
        summary.setAttribute('title', title);
      }
    }
  
    /* Find stretchtext detail for a summary */
    // function findDetailFor (summary) {
    const findDetailFor = summary => {
      if (isBlockLevelDetail(summary)) {
        const id = summary.getAttribute('href').replace(/^#/, '');
        const detail = document.getElementById(id);
        if (!detail && window.console) {
          // template literals
          console.error('No StretchText details element with ID: ${id}');
        }
        return detail;
      } else {
        const detail = summary.nextElementSibling;
        if (!detail && window.console) {
          console.error('No StretchText details element found for: ', summary);
        }
        return detail;
      }
    }
  
    /* Retrieve all summaries (10 in total)*/
    // function getSummaries () {
    const getSummaries = () => {
      // var results = [], summaries;
  
      // epub-type
      let summaries = document.querySelectorAll('[epub-type="stretchsummary"]');
      // Array.prototype.forEach.call(summaries, function (result) {
      //   results.push(result);
      //   console.log(result);
      // });
  
      // summaries.forEach(result => results.push(result));
      let results = Array.from(summaries);
  
      // CSS class.
      summaries = document.getElementsByClassName('stretchsummary');
      // Array.prototype.forEach.call(summaries, function (result) {
      //   results.push(result);
      // });
      // [...summaries].forEach(result => results.push(result));
      // results = results.concat(...summaries);
      results = [...results, ...summaries];
  
      return results;
    }
  
    let loadedCalled = false;
  
    /* add handlers for summaries when HTML doc has been parsed*/
    // function loaded () {
    const loaded = () => {
      if (loadedCalled) { return; }
      loadedCalled = true;
      // FIXME(slightlyoff): Add global handlers instead of one per item.
      // getSummaries().forEach(function (summary) {
      getSummaries().forEach( summary =>{
        summary.setAttribute('title', TITLE_WHEN_CLOSED);
  
        // Listen on mousedown instead of click so that we can prevent text
        // selection if mouse is clicked rapidly.
        summary.addEventListener('mousedown', toggleSummary);
  
        summary.addEventListener('touchstart', toggleSummary);
  
        // Link resolving can't be canceled in mousedown event, only in click
        // event.
        // summary.addEventListener('click', function (e) { e.preventDefault(); });
        summary.addEventListener('click', e => e.preventDefault() ); // prevent from responding both touchstart and click events
      });
    }
  
    window.addEventListener('DOMContentLoaded', loaded);
    if (document.readyState == "complete") {
      loaded();
    }
  })();