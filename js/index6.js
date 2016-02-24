/**
 * Created by zyg on 2015/10/21.
 */
if (!tool.isMobile()) {
	var container = document.querySelectorAll(".container")[0];
	var containerWidth = (document.documentElement.clientWidth || document.body.clientWidth) * 0.4;
	container.style.marginLeft = -containerWidth / 2 + "px";
}
(function() {
	var button = document.querySelectorAll(".button")[0],
		username = document.querySelectorAll(".username")[0],
		tel = document.querySelectorAll(".tel")[0],
		email = document.querySelectorAll(".email")[0],
		address = document.getElementsByName("address"),
		choose = document.getElementsByName("choose"),
		allInput = document.querySelectorAll(".allInput"),
		school = document.querySelectorAll(".school")[0],
		company = document.querySelectorAll(".company")[0],
		position = document.querySelectorAll(".position")[0],
		tips = document.querySelectorAll(".tips")[0],
		flag = tool.isMobile(),
		care = document.querySelectorAll(".care")[0];

	//验证
	username.addEventListener("blur", function() {
		if (username.value == "") {
			this.style.borderColor = "red";
		} else {
			this.style.borderColor = "rgb(0,200,117)";
		}
	});
	/*tel.addEventListener("blur",function(){
	    var reg=/^\d{10,11}$/;
	    if(!(reg.test(tel.value))){
	        this.style.borderColor="red";
	    }else{
	        this.style.borderColor="rgb(0,200,117)";
	    }
	});*/
	email.addEventListener("blur", function() {
		var reg = /^(\w-?\.?)+@(\w-?)+(\.\w{2,})+$/;
		if (!(reg.test(email.value))) {
			this.style.borderColor = "red";
		} else {
			this.style.borderColor = "rgb(0,200,117)";
		}
	});
	/*care.addEventListener("blur",function(){
	    if(care.value==""){
	        this.style.borderColor="red";
	    }else{
	        this.style.borderColor="rgb(0,200,117)";
	    }
	});*/
	for (var i = 0; i < address.length; i++) {
		if (address[i].checked) {
			switch (i) {
				case 0:
					school.addEventListener("blur", function() {
						if (school.value == "") {
							this.style.borderColor = "red";
						} else {
							this.style.borderColor = "rgb(0,200,117)";
						}
					});
					break;
				case 1:
					company.addEventListener("blur", function() {
						if (position.value == "") {
							this.style.borderColor = "red";
						} else {
							this.style.borderColor = "rgb(0,200,117)";
						}

					});
					position.addEventListener("blur", function() {
						if (company.value == "") {
							this.style.borderColor = "red";
						} else {
							this.style.borderColor = "rgb(0,200,117)";
						}

					});
					break;
			}
		}
	}

	for (var i = 0; i < address.length; i++) {
		(function(i) {
			address[i].onchange = function() {
				switch (i) {
					case 0:
						if (address[0].checked) {
							school.disabled = false;
							company.disabled = true;
							position.disabled = true;
							company.value = "";
							position.value = "";
						}
						break;
					case 1:
						if (address[1].checked) {
							school.disabled = true;
							company.disabled = false;
							position.disabled = false;
							school.value = "";
						}
						break;
				}

			}
		})(i);
	}
	//给所有非单选input元素绑定focus改变边框颜色
	for (var i = 0; i < allInput.length; i++) {
		(function() {
			allInput[i].addEventListener("focus", function() {
				this.style.borderColor = "rgb(0,200,117)"
			});
		})()
	}
	//点击按钮
	tool.click(button, function(e) {
		if (username.value == "") {
			username.style.borderColor = "red";
			if (flag) {
				tool.tips(tips, 80, "请输入姓名");
			} else {
				alert("请输入姓名");
			}

			return;
		}
		if (tel.value == "") {}
		if (!(/^\d{10,11}$/.test(tel.value)) && tel.value) {
			tel.style.borderColor = "red";
			if (flag) {
				tool.tips(tips, 90, "手机号不正确");
			} else {
				alert("手机号不正确");
			}

			return;
		}
		if (email.value == "") {
			email.style.borderColor = "red";
			if (flag) {
				tool.tips(tips, 80, "请输入邮箱");
			} else {
				alert("请输入邮箱");
			}

			return;
		}
		if (!(/^(\w-?\.?)+@(\w-?)+(\.\w{2,})+$/.test(email.value))) {
			email.style.borderColor = "red";
			if (flag) {
				tool.tips(tips, 80, "邮箱不正确");
			} else {
				alert("邮箱不正确");
			}

			return;
		}
		for (var i = 0; i < address.length; i++) {
			if (address[i].checked) {
				tool.checked = true;
				switch (i) {
					case 0:

						school.addEventListener("blur", function() {
							if (school.value == "") {
								this.style.borderColor = "red";
								if (flag) {
									tool.tips(tips, 90, "请输入学校名");
								} else {
									alert("请输入学校名");
								}

							}
						});
						break;
					case 1:

						company.addEventListener("blur", function() {
							if (position.value == "") {
								this.style.borderColor = "red";
								if (flag) {
									tool.tips(tips, 90, "请输入公司名");
								} else {
									alert("请输入公司名");
								}

							}

						});
						position.addEventListener("blur", function() {
							if (company.value == "") {
								this.style.borderColor = "red";
								if (flag) {
									tool.tips(tips, 80, "请输入职位");
								} else {
									alert("请输入职位");
								}

							}

						});
						break;
				}
			}
		}
		if (tool.checked == false) {
			if (flag) {
				tool.tips(tips, 80, "请选择一项");
			} else {
				alert("请选择一项");
			}

		}
		/*if(care.value==""){
		    care.style.borderColor="red";
		    tool.tips(tips,100,"请输入关心领域");
		    return;
		}*/
		for (var i = 0; i < choose.length; i++) {
			if (choose[i].checked) {
				tool.checked1 = true;
				break;
			}
		}
		if (tool.checked1 == false) {
			if (flag) {
				tool.tips(tips, 80, "请选择一项");
			} else {
				alert("请选择一项");
			}
			return;
		}
		$.ajax({
			url: "http://case.h6app.com/Form/mia",
			type: "post",
			dataType: "json",
			data: {
				name: username.value,
				tel: tel.value,
				email: email.value,
				company: position.value,
				school: school.value,
				job: company.value,
				careArea: care.value,
				onTime: tool.radioCheck(choose)
			},
			success: function(data) {
				console.dir(data);
				if (data.code == 0) {
					if (flag) {
						tool.tips(tips, 80, "提交成功");
					} else {
						alert("提交成功");
					}

				} else if (data.code == 1) {
					if (flag) {
						tool.tips(tips, 80, "已提交");
					} else {
						alert("已提交");
					}

				} else {
					if (flag) {
						tool.tips(tips, 80, "提交失败");
					} else {
						alert("提交失败");
					}

				}

			}
		})
	})

})();