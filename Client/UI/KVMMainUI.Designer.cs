namespace Keyroll
{
    partial class KVMMainUI
    {
        /// <summary> 
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region 组件设计器生成的代码

        /// <summary> 
        /// 设计器支持所需的方法 - 不要
        /// 使用代码编辑器修改此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(KVMMainUI));
            this.MainPanel = new System.Windows.Forms.Panel();
            this.toolbar = new System.Windows.Forms.ToolStrip();
            this.BtnAddDomain = new System.Windows.Forms.ToolStripButton();
            this.BtnRemoveDomain = new System.Windows.Forms.ToolStripButton();
            this.split1 = new System.Windows.Forms.ToolStripSeparator();
            this.BtnAddRecord = new System.Windows.Forms.ToolStripButton();
            this.BtnRemoveRecord = new System.Windows.Forms.ToolStripButton();
            this.split2 = new System.Windows.Forms.ToolStripSeparator();
            this.BtnRefresh = new System.Windows.Forms.ToolStripButton();
            this.TrvKVM = new System.Windows.Forms.TreeView();
            this.toolbar.SuspendLayout();
            this.SuspendLayout();
            // 
            // MainPanel
            // 
            this.MainPanel.Dock = System.Windows.Forms.DockStyle.Right;
            this.MainPanel.Location = new System.Drawing.Point(240, 0);
            this.MainPanel.Name = "MainPanel";
            this.MainPanel.Size = new System.Drawing.Size(300, 400);
            this.MainPanel.TabIndex = 8;
            // 
            // toolbar
            // 
            this.toolbar.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.toolbar.GripStyle = System.Windows.Forms.ToolStripGripStyle.Hidden;
            this.toolbar.ImageScalingSize = new System.Drawing.Size(24, 24);
            this.toolbar.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.BtnAddDomain,
            this.BtnRemoveDomain,
            this.split1,
            this.BtnAddRecord,
            this.BtnRemoveRecord,
            this.split2,
            this.BtnRefresh});
            this.toolbar.Location = new System.Drawing.Point(0, 369);
            this.toolbar.Name = "toolbar";
            this.toolbar.Size = new System.Drawing.Size(240, 31);
            this.toolbar.TabIndex = 10;
            // 
            // BtnAddDomain
            // 
            this.BtnAddDomain.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.BtnAddDomain.Image = global::Keyroll.Properties.Resources.add_domain;
            this.BtnAddDomain.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnAddDomain.Name = "BtnAddDomain";
            this.BtnAddDomain.Size = new System.Drawing.Size(28, 28);
            this.BtnAddDomain.Text = "Add";
            this.BtnAddDomain.Click += new System.EventHandler(this.BtnAddDomain_Click);
            // 
            // BtnRemoveDomain
            // 
            this.BtnRemoveDomain.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.BtnRemoveDomain.Image = global::Keyroll.Properties.Resources.remove_domain;
            this.BtnRemoveDomain.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnRemoveDomain.Name = "BtnRemoveDomain";
            this.BtnRemoveDomain.Size = new System.Drawing.Size(28, 28);
            this.BtnRemoveDomain.Text = "Remove";
            this.BtnRemoveDomain.Click += new System.EventHandler(this.BtnRemoveDomain_Click);
            // 
            // split1
            // 
            this.split1.Name = "split1";
            this.split1.Size = new System.Drawing.Size(6, 31);
            // 
            // BtnAddRecord
            // 
            this.BtnAddRecord.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.BtnAddRecord.Image = ((System.Drawing.Image)(resources.GetObject("BtnAddRecord.Image")));
            this.BtnAddRecord.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnAddRecord.Name = "BtnAddRecord";
            this.BtnAddRecord.Size = new System.Drawing.Size(28, 28);
            this.BtnAddRecord.Text = "toolStripButton1";
            this.BtnAddRecord.Click += new System.EventHandler(this.BtnAddRecord_Click);
            // 
            // BtnRemoveRecord
            // 
            this.BtnRemoveRecord.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.BtnRemoveRecord.Image = ((System.Drawing.Image)(resources.GetObject("BtnRemoveRecord.Image")));
            this.BtnRemoveRecord.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnRemoveRecord.Name = "BtnRemoveRecord";
            this.BtnRemoveRecord.Size = new System.Drawing.Size(28, 28);
            this.BtnRemoveRecord.Text = "toolStripButton1";
            this.BtnRemoveRecord.Click += new System.EventHandler(this.BtnRemoveRecord_Click);
            // 
            // split2
            // 
            this.split2.Name = "split2";
            this.split2.Size = new System.Drawing.Size(6, 31);
            // 
            // BtnRefresh
            // 
            this.BtnRefresh.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.BtnRefresh.Image = global::Keyroll.Properties.Resources.refresh;
            this.BtnRefresh.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.BtnRefresh.Name = "BtnRefresh";
            this.BtnRefresh.Size = new System.Drawing.Size(28, 28);
            this.BtnRefresh.Text = "Refresh";
            this.BtnRefresh.Click += new System.EventHandler(this.BtnRefresh_Click);
            // 
            // TrvKVM
            // 
            this.TrvKVM.Dock = System.Windows.Forms.DockStyle.Fill;
            this.TrvKVM.Font = new System.Drawing.Font("微软雅黑", 10F);
            this.TrvKVM.FullRowSelect = true;
            this.TrvKVM.Location = new System.Drawing.Point(0, 0);
            this.TrvKVM.Name = "TrvKVM";
            this.TrvKVM.Size = new System.Drawing.Size(240, 369);
            this.TrvKVM.TabIndex = 11;
            this.TrvKVM.AfterSelect += new System.Windows.Forms.TreeViewEventHandler(this.TrvKVM_AfterSelect);
            // 
            // KVMMainUI
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.TrvKVM);
            this.Controls.Add(this.toolbar);
            this.Controls.Add(this.MainPanel);
            this.Name = "KVMMainUI";
            this.Size = new System.Drawing.Size(540, 400);
            this.toolbar.ResumeLayout(false);
            this.toolbar.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Panel MainPanel;
        private System.Windows.Forms.ToolStrip toolbar;
        private System.Windows.Forms.TreeView TrvKVM;
        private System.Windows.Forms.ToolStripButton BtnRefresh;
        private System.Windows.Forms.ToolStripButton BtnAddDomain;
        private System.Windows.Forms.ToolStripButton BtnRemoveDomain;
        private System.Windows.Forms.ToolStripButton BtnAddRecord;
        private System.Windows.Forms.ToolStripButton BtnRemoveRecord;
        private System.Windows.Forms.ToolStripSeparator split1;
        private System.Windows.Forms.ToolStripSeparator split2;

    }
}
